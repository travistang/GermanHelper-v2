import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import './style.css'

export default function(WrappedComponent) {
  return function({children, ...props}) {
    const [open, setOpen] = React.useState(false)
    const [actionSheetComponents, setActionSheetComponents ] = React.useState(null)

    const DrawerComponent = () => (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}>
        <div className="ActionSheetContainer">
          {actionSheetComponents}
        </div>
      </Drawer>
    )
    return [
      <WrappedComponent
        {...props}
        setActionSheetComponents={setActionSheetComponents}
        open={open} setOpen={setOpen}
      />,
      <DrawerComponent open={open} />
    ]
  }
}
