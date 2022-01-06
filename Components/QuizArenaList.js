import React, { useContext } from 'react'
import { QuizStateContext } from '../src/context'
import QuizArenaCard from './QuizArenaCard';

const QuizArenaList = (props) => {


    const _quizState = useContext(QuizStateContext)
    console.log("_quizState", _quizState);

    return (
        <>
            {
                _quizState.map((q, index) => {
                    return (
                        <QuizArenaCard
                            key={index}
                            q={q}
                            index={index}
                            {...props}
                        // inputError={inputError}
                        // handleUserAnswer={handleUserAnswer}
                        // currentQ={currentQ}
                        />
                    )
                })
            }

        </>
    )
}

export default QuizArenaList
