import React from 'react'
import { withTheme } from '@material-ui/styles'
import Separator from '../../components/separator'
import AddMeaningComponent from './AddMeaningComponent'

import {
  List, Typography, Icon,
  ListItem,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'

function EditMeaningList({meanings = [], setMeanings, ...props }) {
  const { theme } = props // withTheme
  // control the index of which item expands
  const [expandedIndex, setExpandedIndex] = React.useState(null)
  const [addingMeaning, setAddingMeaning] = React.useState(false)
  // handles the editing of particular meaning entry
  const setMeaningItem = (i, newMeaning) => {
    const newMeanings = [...meanings] // clone the old meanings
    newMeanings[i] = newMeaning
    setMeanings(newMeanings)
    setExpandedIndex(null) // also close the panel
  }

  const removeMeaningItem = i => {
    const newMeanings = [...meanings]
    newMeanings.splice(i, 1)
    setMeanings(newMeanings)
  }

  const addMeaningItem = meaning => {
    setMeanings([...meanings, meaning])
    setAddingMeaning(false)
  }

  return (
    <div className="EditBookmarkMeaningList">
      <List dense={false}>
        {meanings.map((meaning, i) => (
          <ExpansionPanel
            expanded={i === expandedIndex}
            onChange={() => setExpandedIndex(expandedIndex === i?null:i)}
            key={i}>
            <ExpansionPanelSummary
              classes={{
                root: 'EditBookmarkMeaningListSummaryRoot',
                content: 'EditBookmarkMeaningListSummaryContent'
              }}
              expansionIcon={<Icon>expand_more</Icon>}
            >
              <div className="EditBookmarkMeaningListItem">
                <div className="EditBookmarkMeaningListItemIndex">
                  <Typography variant="h4">{i + 1}.</Typography>
                </div>
                <div className="EditBookmarkMeaningListItemText">
                  <Typography variant="h4">
                    { meaning }
                  </Typography>
                </div>
                <div onClick={e => {e.stopPropagation();removeMeaningItem(i)}}
                  className="EditBookmarkMeaningListItemRemove">
                  <Icon style={{color: 'red'}}>delete</Icon>
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="EditBookmarkMeaningListItemContainer">
                <TextField fullWidth
                  id={`meaning-${i}`}
                  defaultValue={meaning}
                />
                <div className="EditBookmarkMeaningListItemContainerAction">
                  <Button onClick={() => setExpandedIndex(null)}>Cancel</Button>
                  <Button color="primary"
                    onClick={() => setMeaningItem(i, document.getElementById(`meaning-${i}`).value)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <AddMeaningComponent addMeaningItem={addMeaningItem} />
      </List>
    </div>
  )
}

export default withTheme(EditMeaningList)
