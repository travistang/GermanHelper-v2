import React from 'react';
import './style.css';
import { Typography, Icon } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchGroup from './SearchGroup';
import CenterNotice from '../../components/CenterNotice';
import ShortWordCard from '../../components/ShortWordCard';
import withCamera from '../../backend/withCamera';
import withCircularProgress from '../../backend/withCircularProgress';
import withOffline from '../../backend/withOffline';

function SearchPage(props) {
    const {
      theme,  // withTheme
      searches,
      online, // withOffline
      history, // withRouter
      photo, launchCamera, // withCamera
      recognizing, boxAndWords, // withCamera
      setShowProgress, setProgressTitle // withCircularProgress
    } = props

    // show up the recognizing popup
    React.useEffect(() => {
      setProgressTitle("Detecting text...")
      setShowProgress(recognizing)
    }, [recognizing])

    // push to the OCR result page when results and photos are both available
    React.useEffect(() => {
      if(boxAndWords && photo) {
        // push to next page...
        history.push({
          pathname: '/ocr',
          state: { boxAndWords, photo }
        })
      }
    }, [boxAndWords])

    const CameraButton = () => (
      <div style={{color: online?'white':'rgba(255, 255, 255, 0.3)'}}>
        <Icon
          onClick={online && launchCamera}
          color="white" style={{fontSize: 36}}>photo_camera</Icon>
      </div>
    )
    return (
      <div
        style={{backgroundColor: theme.palette.primary.main }}
        className="SearchPageMain">
        <div className="SearchPageTop">
          <CameraButton />
          <div style={{flex: 1}}>
            <Typography variant="h1"
              style={{marginBottom: 8, color: theme.palette.white.main}}>
              German Helper
            </Typography>
            <Typography variant="h3" style={{color: theme.palette.grey2.main}}>
              Search words or phrases below...
            </Typography>
          </div>

        </div>
        <div
          style={{backgroundColor: theme.palette.white.main }}
          className="SearchPageBottom">
          <SearchGroup />
          <div className="SearchResultGroup">
            <Typography variant="h2">Recently Searched</Typography>
            <div style={{height: 28}} />
            {
              searches.length?searches.reverse().map(search => (
                <ShortWordCard {...search} />
              )):(
                <CenterNotice
                  iconName="search_outlined"
                  title="You did not search anything recently"
                />
              )
            }
        </div>
        </div>
      </div>
    )
}

const mapStateToProps = state => state.search
export default connect(mapStateToProps, null)(
  withTheme(
    withRouter(
      withOffline(
        withCamera(
          withCircularProgress(SearchPage)
        )
      )
    )
  )
)
