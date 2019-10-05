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

import { AnimatedSwitch } from 'react-router-transition'
import transition, { mapStyles } from './transition';

import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
const { store, persistor } = configureStore()

persistor.purge()

class App extends React.Component {
  render() {
    const toProperRoute = path => (`${process.env.PUBLIC_URL}${path}`)
    
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <div className="App">
                  <div className="MainContent">
                    <Route path={toProperRoute('/search')} component={SearchResultPage} />
                    <Route path={toProperRoute("/wordDetails")} component={WordDetailsPage} />
                    <Route path={toProperRoute("/words")} component={BookmarkPage} />
                    <Route path={toProperRoute("/edit")} component={EditBookmarkPage} />
                    <Route path={toProperRoute("/ocr")} component={OCRSelectWordPage} />
                    <Route path={toProperRoute("/settings")} component={ConfigPage} />
                    <Route path={toProperRoute("/activity")} component={ActivityPage} />
                    <Route exact path={toProperRoute("/")} component={SearchPage} />
                </div>

                <OfflineBanner />
                <BottomNavigation />
              </div>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </Router>

    )
  }
}

export default App;
