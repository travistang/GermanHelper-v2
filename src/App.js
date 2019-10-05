import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import BottomNavigation from './pages/BottomNavigation'
import OfflineBanner from './pages/OfflineBanner'

import theme from './theme'
import { ThemeProvider } from '@material-ui/styles';

import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import WordDetailsPage from './pages/WordDetails';
import BookmarkPage from './pages/BookmarkPage';
import EditBookmarkPage from './pages/EditBookmarkPage';
import OCRSelectWordPage from './pages/OCRSelectWordPage';
import ConfigPage from './pages/ConfigPage';
import ActivityPage from './pages/ActivityPage';

import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
const { store, persistor } = configureStore()



class App extends React.Component {
  render() {
    return (

        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router basename="/GermanHelper-v2">
            <PersistGate loading={null} persistor={persistor}>
              <div className="App">
                  <div className="MainContent">
                    <Route path='/search' component={SearchResultPage} />
                    <Route path="/wordDetails" component={WordDetailsPage} />
                    <Route path="/words" component={BookmarkPage} />
                    <Route path="/edit" component={EditBookmarkPage} />
                    <Route path="/ocr" component={OCRSelectWordPage} />
                    <Route path="/settings" component={ConfigPage} />
                    <Route path="/activity" component={ActivityPage} />
                    <Route exact path="/" component={SearchPage} />
                </div>

                <OfflineBanner />
                <BottomNavigation />
              </div>
            </PersistGate>
            </Router>
          </Provider>
        </ThemeProvider>


    )
  }
}

export default App;
