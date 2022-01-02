import { createContext, useContext, useReducer } from 'react';
import { appReducer } from '../reducer';

export const QuizStateContext = createContext();
export const QuizUpdateContext = createContext();

export function AppWrapper({ children }) {
    const [state, dispatch] = useReducer(appReducer, [

        {
            id: "",
            title: "",
            desc: "",
            createdDate: "",
            deadline: "",
            participants: { goal: 200, current: 100 },
            quiz: [
                {
                    id: "id__Me",
                    q: "What's your name ?",
                    answer: "A",
                    altA: "Luffy",
                    altB: "Zoro",
                    altC: "Nami",
                },
                {
                    id: "id__Me",
                    q: "What's your name ?",
                    answer: "A",
                    altA: "Luffy",
                    altB: "Zoro",
                    altC: "Nami",
                },
            ],
            stats: {

            }
        }

    ])

    return (
        <QuizStateContext.Provider value={state}>
            <QuizUpdateContext.Provider value={dispatch}>
                {children}
            </QuizUpdateContext.Provider>
        </QuizStateContext.Provider>
    );
}
