import React from 'react'
import { withServerConfig } from '../../reducers/config'
import { withTheme } from '@material-ui/styles'

import TopNavigation from '../TopNavigation'
import Separator from '../../components/separator'
import {
  Typography,
  TextField,
  Fab,
  Icon
} from '@material-ui/core'

import './style.css'

function ConfigPage(props) {
  const {
    serverURL: defaultServerURL,
    proxyURL: defaultProxyURL,
    setConfig // withServerConfig
  } = props

  const [tempConfig, setTempConfig] = React.useState({
    serverURL: defaultServerURL,
    proxyURL: defaultProxyURL
  })

  const validateTempConfig = () => {
    const { serverURL, proxyURL } = tempConfig
    if(
      !serverURL.startsWith('http') ||
      !proxyURL.startsWith('http') ||
      !serverURL || !proxyURL
    ) return false

    return true
  }
  const [isConfigValid, setIsConfigValid] = React.useState(false)

  React.useEffect(() => {
    // validate here
    setIsConfigValid(validateTempConfig())
  }, [tempConfig])
  return (
    <div className="ConfigPage">
      <TopNavigation
        title="Settings"
      />
      <div className="ConfigPageInner">
        <TextField
          label="Proxy URL"
          onChange={e => setTempConfig({
            ...tempConfig, proxyURL: e.target.value
          }) || e.target.focus()}
          value={tempConfig.proxyURL}
          placeholder="Address of the Proxy Server"
        />
        <Separator size={16} />
        <TextField
          label="OCR Server URL"
          onChange={e => setTempConfig({
            ...tempConfig, serverURL: e.target.value
          }) || e.target.focus()}
          value={tempConfig.serverURL}
          placeholder="Address of the OCR Server"
        />
        <div style={{flex: 1}} />
        <Fab variant="extended" color="primary"
          disabled={!isConfigValid}
          onClick={() => setConfig(tempConfig)}>
          <Icon>save</Icon>
          <Separator horizontal />
          <Typography variant="h3">Save Settings</Typography>
        </Fab>
        <Separator size={16} />
      </div>
    </div>
  )
}

export default withTheme(
  withServerConfig(ConfigPage)
)
