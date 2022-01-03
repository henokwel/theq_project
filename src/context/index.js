import { createContext, useReducer } from 'react';
import { appReducer } from '../reducer';

export const QuizStateContext = createContext();
export const QuizUpdateContext = createContext();

export function AppWrapper({ children }) {
    const [state, dispatch] = useReducer(appReducer, [])

    return (
        <QuizStateContext.Provider value={state}>
            <QuizUpdateContext.Provider value={dispatch}>
                {children}
            </QuizUpdateContext.Provider>
        </QuizStateContext.Provider>
    );
}
