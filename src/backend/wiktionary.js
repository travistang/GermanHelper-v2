import { range } from 'lodash'
import { recognisedWordForms, grammaticalCases } from './constants'
import $ from 'jquery'

export default class Wiktionary {

  constructor(url = null) {
    if(url) {
      this.baseURL = `${url}/wiki`
      this.apiURL = `${url}/w/api.php`
    }
  }

  async fetchJSON(url) {
    const res = await fetch(url)
    return res.json()
  }

  async getSearchAutoCompleteSuggestion(searchTerm) {
    const url = `${this.apiURL}?action=opensearch&limit=5&search=${encodeURIComponent(searchTerm)}`
    const data = await this.fetchJSON(url)
    if (data.length !== 4) throw new Error()
    return Object.assign({}, ...range(data[1].length).map(i => ({ [data[1][i]]: data[3][i] })))
  }

  async getPageContent(word) {
    const url = `${this.baseURL}/${word}`
    const data = await fetch(url)
    const html = await data.text()
    try {
      const parser = $(html)
      return parser
    } catch(e) {
      return null
    }

  }

  doesWordExists(page) {
    return page.find("a[href='/wiki/Wiktionary:Requested_entries']").length < 2
  }

  getGermanSection(page) {
    if(!this.isGermanWord(page)) return null
    return page.find('h2:has(span[id="German"])').next().children()
  }

  getWordFormSection(germanSection, form) {
    const formTag = germanSection.end().find(`h3:has(span:contains(${form})),h4:has(span:contains(${form}))`)
    if (formTag.length === 0) return null

    return formTag.first().nextUntil('h3,h4')
  }

  isGermanWord(page) {
    return page.find('span[id="German"]').length === 1
  }

  getQualifier(formSection) {
    const text = formSection
      .end()
      .next('p:has(span.ib-content)')
      .text().trim().toLowerCase()
    for(let i in grammaticalCases) {
      if(text.indexOf(grammaticalCases[i]) !== -1) {
        return grammaticalCases[i]
      }
    }
  }

  getMeaning(formSection) {
    const meanings = formSection
      .next('ol') // the list of meanings
      .children('li') // some li has display: none elements inside that gives some gibberish so only visibles are included
      .map(function() {
          return $(this).clone()
            .children(':not(a, i, span)') // no [quotations] or hidden li-s, but <a> are included since some of the translations are wrapped in it (and some are even within a huge 'span')
            .remove()            // take away those mentioned above
            .end()               // return to the parent (this)
            .text().trim()       // and take the text, tidy up
          })
      .get()                     // get the array back
    return meanings
  }

  getGender(formSection) {
    return formSection.find('abbr[title*="gender"]').text()[0]
  }

  getNounDeclension(nounSection) {
    // this is the one-line summary below the h3 with span "Noun"
    // example: "Herausforderung f (genitive Herausforderung, plural Herausforderungen)"
    const smallSummary = nounSection.end().next('p:has(span)')
    if(smallSummary.length === 0) return {} // something wrong here
    let info = {}

    // scrape the small summary...
    const plural = smallSummary.find('i:contains(plural)') // the "plural" tag in the one-line summary
      .next() // the word after "plural"
      .text()
    const genitive = smallSummary.find('i:contains(genitive)') // the "plural" tag in the one-line summary
      .next() // the word after "plural"
      .text()
    info.plural = plural
    info.genitive = genitive

    return info
  }

  getAuxillaryVerb(section) {
    return section.end().next('p').find('i:contains(auxiliary)').next().text()
  }

  getTense(section) {
    let tense = {}
    const pSection = section.end().next('p')
    tense.past_participle = pSection.find('i:contains(participle)').next().text()
    tense.third_person_singular = pSection.find('i:contains(third):contains(singular)').next().text()
    tense.past_tense = pSection.find('i:contains(past tense)').next().text()
    return tense
  }
  getAdjectiveComparatives(section) {
    const pSection = section.end().next('p')
    const comparative = pSection.find('i:contains(comparative)').next().text()
    const superlative = pSection.find('i:contains(superlative)').next().text()
    return { comparative, superlative }
  }
  async getWordInfo(word) {
    const page = await this.getPageContent(word)
    const germanSection = this.getGermanSection(page)
    if (!germanSection) return null
    let info = {}
    recognisedWordForms.forEach(form => {
      const section = this.getWordFormSection(germanSection, form)
      if(!section) {
        info[form] = null
        return
      }
      info[form] = {}
      info[form].meaning = this.getMeaning(section)
      switch(form) {
        case "Adjective":
          info[form] = {...info[form], ...this.getAdjectiveComparatives(section)}
          break
        case "Verb":
          info[form].auxillary = this.getAuxillaryVerb(section)
          info[form].tense = this.getTense(section)
          break
        case "Noun":
          info[form].gender = this.getGender(section)
          info[form].declension = this.getNounDeclension(section)
          break
        case "Preposition":
          info[form].qualifier = this.getQualifier(section)
          break
        default: break
      }
    })
    if (Object.keys(info).length === 0) return null // empty object??
    return info
  }
}
