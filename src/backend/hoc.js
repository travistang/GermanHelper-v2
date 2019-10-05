import React from 'react'
import Wiktionary from './wiktionary'
import { connect } from 'react-redux'
import { actions as SearchAction } from '../reducers/search'
import { withServerConfig } from '../reducers/config'

export function withWiktionary(WrappedComponent) {
  return withServerConfig(
    function(props) {
      const { proxyURL } = props // withServerConfig
      const wiktionary = new Wiktionary(proxyURL)
      return <WrappedComponent {...props} wiktionary={wiktionary} />
    }
  )
}

export function withWordSearch(WrappedComponent) {
  const mapDispatchToProps = dispatch => ({
    addSearch: search => dispatch({type: SearchAction.ADD_SEARCH, search})
  })

  return connect(null, mapDispatchToProps)(
    withServerConfig(
      function({
        location, addSearch,
        proxyURL, // withServerConfig
        ...props}) {
        const wiktionary = new Wiktionary(proxyURL)
        if(!location) return <WrappedComponent {...props} />
          const word = location.pathname.split('/').pop()

          const [ wordInfo, setWordInfo ] = React.useState(null)
          const [ loading, setLoading ] = React.useState(true)

          // load the words...
          React.useEffect(() => {
            async function fetchWord() {
              const wordInfo = await wiktionary.getWordInfo(word)
              setWordInfo(wordInfo)
              setLoading(false)
              // add Search to record
              wordInfo && Object.keys(wordInfo).forEach(form => {
                const info = wordInfo[form]
                if(info) {
                  addSearch({ word, info, form })
                }
              })
            }
            fetchWord()
          }, [])

          return <WrappedComponent wordInfo={wordInfo} loading={loading} {...props} />
      })
  )
}
