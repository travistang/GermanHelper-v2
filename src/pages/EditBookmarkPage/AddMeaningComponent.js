import React from 'react'
import {
  Icon, Button, TextField, Typography
} from '@material-ui/core'
import Separator from '../../components/separator'

export default function({addMeaningItem}) {
  const [addingMeaning, setAddingMeaning] = React.useState(false)
  const [newMeaningValue, setNewMeaningValue] = React.useState('')
  const updateNewMeaningValue = e => {
    setNewMeaningValue(e.target.value)
  }
  const onAddMeaning = () => {
    addMeaningItem(newMeaningValue)
    setNewMeaningValue('')
  }
  React.useEffect(() => {
    const field = document.getElementById('addMeaningField')
    if(field)field.focus()
  }, [newMeaningValue])
  const AddMeaningComponent = () => (
    <div
      className="EditBookmarkAddMeaning"
      onClick={() => setAddingMeaning(true)}>
      <Icon>add</Icon>
      <Separator horizontal />
      <Typography variant="h3">Add Meaning...</Typography>
    </div>
  )

  const AddMeaningFieldComponent = () => (
    <div className="EditBookmarkAddMeaningField">
      <TextField
        id="addMeaningField"
        placeholder="Some meanings about this word..."
        value={newMeaningValue}
        onChange={updateNewMeaningValue}
        label="Meaning" />
      <div className="EditBookmarkMeaningListItemContainerAction">
        <Button onClick={() => setAddingMeaning(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!newMeaningValue}
          onClick={onAddMeaning}>
          Confirm
        </Button>
      </div>
    </div>
  )

  return (
    addingMeaning?
    <AddMeaningFieldComponent />:
    <AddMeaningComponent />
  )
}
