import { createContext, useEffect, useReducer } from 'react';
import { appReducer } from '../reducer';

export const QuizStateContext = createContext();
export const QuizUpdateContext = createContext();

export function AppWrapper({ children }) {
    const [state, dispatch] = useReducer(appReducer, [])

    // useEffect(() => {

    //     const res = localStorage.getItem('myValueInLocalStorage')
    //     console.log(res);
    //     if (null) return

    //     console.log(res);
    //     // dispatch({ type: "POPULATE", payload: res })

    // }, []);


    return (
        <QuizStateContext.Provider value={state}>
            <QuizUpdateContext.Provider value={dispatch}>
                {children}
            </QuizUpdateContext.Provider>
        </QuizStateContext.Provider>
    );
}
