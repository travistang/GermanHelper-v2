import React from 'react';
import './style.css';
import { Icon, Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';

function CenterNotice({theme, iconName, title, subtitle = '', className, ...props}) {
  return (
    <div className={`CenterNotice ${className || ''}`} style={{color: theme.palette.grey2.main}}>
      <Icon className="CenterNoticeIcon">{iconName}</Icon>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h4">{subtitle}</Typography>
    </div>
  )
}

export default withTheme(CenterNotice)
