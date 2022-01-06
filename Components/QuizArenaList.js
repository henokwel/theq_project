import React, { useContext } from 'react'
import { QuizStateContext } from '../src/context'
import QuizArenaCard from './QuizArenaCard';

const QuizArenaList = (props) => {

    const _quizState = useContext(QuizStateContext)
    const _quizArray = _quizState.quiz

    return (
        <>
            {
                _quizArray  ? <p>Hello worl</p>:
                _quizArray.map((q, index) => {
                    return (
                        <QuizArenaCard
                            key={index}
                            q={q}
                            index={index}
                            {...props}
                        />
                    )
                })
            }
        </>
    )
}

export default QuizArenaList
