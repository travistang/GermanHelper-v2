import React from 'react'
import './style.css'
import TabButton from './TabButton'
import { withTheme } from '@material-ui/styles'

class BottomNavigation extends React.Component {
  buttons = [
    {
      iconName: 'search_outlined',
      label: 'Search',
      href: '/',
    },
    {
      iconName: 'bookmark',
      label: 'Bookmarks',
      href: '/words'
    },
    {
      iconName: 'bar_chart_outlined',
      label: 'Activities',
      href: '/activity'
    },
    {
      iconName: 'settings_applications_outlined',
      label: 'Settings',
      href: '/settings'
    }
  ]
  render() {
    return (
      <div
        className="BottomNavigationContainer">
      {
        this.buttons.map((info) => (
          <TabButton {...info}/>
        ))
      }

      </div>
    )
  }
}

export default withTheme(BottomNavigation)
