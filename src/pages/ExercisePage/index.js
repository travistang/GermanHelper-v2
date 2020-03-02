import React from 'react'
import TopNavigation from '../TopNavigation'
import './style.css'
export default function ExercisePage(props) {
    return (
        <div className="ExercisePage">
            <TopNavigation 
                title="Exercise"
                withBackButton 
            />
        </div>
    )
}