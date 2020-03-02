import React from 'react'
import { withRouter } from 'react-router-dom'
import withBookmarks from '../../backend/withBookmarks'
import TopNavigation from '../TopNavigation'
import EditBookmarkMeaningList from './EditMeaningList'
import { recognisedWordForms } from '../../backend/constants'
import Separator from '../../components/separator'
import {
  TextField,
  Typography,
  Icon,
  Fab,
  Select, MenuItem, FormControl, InputLabel
 } from '@material-ui/core'
import './style.css'
function EditBookmarkPage(props) {
  const {
    location, history, bookmarks,
    getBookmark, addBookmark // withBookmarks
   } = props
  const { adding: isAdding = false, info = {meaning: []} } = location.state

  const [editedWord, setEditedWord] = React.useState(info)
  const [isWordValid, setWordValid] = React.useState(false)

  const createBookmark = () => {
    const { word, form, ...info } = editedWord
    addBookmark({word, form, info})
    history.goBack()
  }
  React.useEffect(() => {
    const { word, form, meaning } = editedWord
    if(
      !word
      || !!getBookmark(editedWord)
      || recognisedWordForms.indexOf(form) === -1
      || editedWord.meaning.length === 0) {
      setWordValid(false)
      return
    }
    setWordValid(true)
  }, [editedWord])

  const EditField = ({fieldName, label, className, ...props}) => (
    <TextField
      {...props}
      className={`EditBookmarkTextField ${className || ''}`}
      onBlur={e => setEditedWord({...editedWord, [fieldName]: e.target.value})}
      defaultValue={editedWord[fieldName]}
      label={label}
    />
  )

  const verticalBuffer = <div style={{height: 8}} />
  const subtitleRow = subtitle => (
    <div className="WordDetailsSubtitleRow">
      <Typography variant="h3">{subtitle}</Typography>
    </div>
  )

  return (
    <div className="EditBookmarkPage">
      <TopNavigation
        leftButton={{
          name: 'keyboard_arrow_left',
          onClick: () => history.goBack()
        }}
        title={`${isAdding?"Adding":"Editing"} Bookmark`}
      />
      <div className="EditBookmarkPageInner">
        <div className="WordDetailsRow">
          <div className="WordDetailsSumamryContainer">
            <EditField fieldName="word" label="word" style={{width: '80%'}}/>
            <Separator horizontal={false} />
            <form>
            <FormControl classes={{root: 'EditBookmarkSelectFormControl'}}>
              <InputLabel htmlFor="formInput">Word Form</InputLabel>
              <Select
                inputProps={{id: 'formInput'}}
                placeholder="Form"
                onChange={e => setEditedWord({...editedWord, form: e.target.value})}
                value={editedWord.form}>
                {recognisedWordForms.map(form => (
                  <MenuItem
                    value={form}>{form}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </form>
          </div>
        </div>
        <div className="WordDetailsRow">
          {subtitleRow("Meaning")}
        </div>
        <div className="WordDetailsRow">
          <EditBookmarkMeaningList
            meanings={editedWord.meaning}
            setMeanings={(newMeanings) => setEditedWord({...editedWord, meaning: newMeanings})}
          />
        </div>
        <div className="WordDetailsRow">
          <Fab
            disabled={!isWordValid}
            variant="extended" color="primary"
            onClick={createBookmark}
            className="EditBookmarkPageSubmitButton">
            <Icon>bookmark</Icon>
            <Separator horizontal />
            <Typography variant="h3">Add Bookmark</Typography>
          </Fab>
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  withBookmarks(EditBookmarkPage)
)
