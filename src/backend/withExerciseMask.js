import React from 'react'
import { Fab, Icon } from '@material-ui/core'

export default function withExerciseMask(WrappedComponent) {
    return function(props) {
        const [ showExerciseFab, setShowExerciseFab ] = React.useState(true)
        const [ revealAnswers, setRevealAnswers ] = React.useState(false)
        return (
            <>
                <WrappedComponent 
                    {...props}
                    setShowExerciseFab={setShowExerciseFab}
                    revealAnswers={revealAnswers}
                    setRevealAnswers={setRevealAnswers}
                />
                {
                    showExerciseFab && (
                        <Fab classes={{
                              root: "ExerciseFab"  
                            }}
                            color="primary" 
                            onClick={() => setRevealAnswers(!revealAnswers)}>
                            <Icon>edit</Icon>
                        </Fab>
                    )
                }
            </>
        )
    }
}