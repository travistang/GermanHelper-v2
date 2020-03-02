import React from 'react'
import { 
    Fab, Icon,
    Typography
} from '@material-ui/core'
import Separator from '../../components/separator'
import { withTheme } from '@material-ui/styles'
import './style.css'

/*
    The context for an exercise.

    Under the context, the major component would be "granted" with a FAB button for revealling / covering all answers.
    Each decendents can be wrapped with exerciseMask and become one of those elements being covered.

*/
const ExerciseContext = React.createContext()

export default function withExerciseMask(WrappedComponent) {
    
    return function(props) {
        const [ showExerciseFab, setShowExerciseFab ] = React.useState(false)
        const [ revealAnswers, setRevealAnswers ] = React.useState(false)
        const [ hasAnswerRevealed, setHasAnswerRevealed ] = React.useState(false)
        
        const fabIcon = hasAnswerRevealed?"undo":"edit"
        const fabText = hasAnswerRevealed?"Reset":"Test"

        const onFabClick = () => {
            setRevealAnswers(!revealAnswers)
            setHasAnswerRevealed(false)
        }

        return (
            <ExerciseContext.Provider 
                value={{ 
                    setHasAnswerRevealed // this gives the children to have a chance 
                    // to notify the root of the exercise that there are answers being uncovered and act accordingly
                }}>
                <WrappedComponent 
                    {...props}
                    setShowExerciseFab={setShowExerciseFab}
                    revealAnswers={revealAnswers}
                    setRevealAnswers={setRevealAnswers}
                />
                {
                    showExerciseFab && (
                        <Fab classes={{root: "ExerciseFab"}} 
                            variant="block"
                            color="primary" 
                            onClick={onFabClick}>
                            <Icon>{fabIcon}</Icon>
                            <Separator horizontal />
                            <Typography variant="h3">{fabText}</Typography>
                        </Fab>
                    )
                }
            </ExerciseContext.Provider>
        )
    }
}

const Mask = withTheme(function({
    theme: {palette},
    setHasAnswerRevealed,
    setReveal,

    className, // style
    ...props
}) {
    const onClick = () => {
        setReveal(true)
        setHasAnswerRevealed(true)
    }
    return (
        <div className={ className || "ExerciseMask"} 
             onClick={onClick}
             style={{backgroundColor: palette.primary.main}}
             {...props}
        />
    )
})

/*
    Add an additional mask to the component, click to reveal the answer
    Also registers 
*/
export function exerciseMask() {
    return function({children, ...props}) {
        const [ reveal, setReveal ] = React.useState(true)
        return (
            reveal?children:(
                <ExerciseContext.Consumer>
                    {
                        ({setHasAnswerRevealed}) => (
                            <Mask {...props}
                                setHasAnswerRevealed={setHasAnswerRevealed}
                                setReveal={setReveal} 
                            /> 
                        )
                    }
                </ExerciseContext.Consumer>                
            )
        )
    }
}

export const ExerciseMask = exerciseMask()