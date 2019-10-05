import React from 'react'
import TopNavigation from '../TopNavigation'
import PhotoWithBoxes from './PhotoWithBoxes'
import CenterNotice from '../../components/CenterNotice'
import OCRSuggestions from './OCRSuggestions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'
import './style.css'
function OCRSelectWordPage(props) {
  const {
    history, location, // withRouter
    theme, // withTheme
  } = props

  // format of selected word: { word, image: image_patch }
  const [selectedWord, setSelectedWord] = React.useState(null)

  const {
    state: { boxAndWords, photo } = {}
  } = location

  return (
    <div className="OCRSelectWordPage">
      <TopNavigation
        title="Choose words to add"
        withBackButton
      />

      <div className="OCRSelectWordPageInner">
        <PhotoWithBoxes
          photo={photo}
          boxAndWords={boxAndWords}
          onBoxChosen={setSelectedWord}
        />
        <div className="OCRSelectWordBoxPreviewContainer">
          {!selectedWord?(
              <CenterNotice
                iconName="edit"
                title="Click boxes above to see closest match of this word"
              />
            ):(
              <OCRSuggestions
                suggestionStatxe={location.state}
                word={selectedWord && selectedWord.word}/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  withTheme(OCRSelectWordPage)
)
