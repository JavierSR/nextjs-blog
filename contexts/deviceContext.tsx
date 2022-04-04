import { createContext, useReducer, FC, ReactElement, Dispatch } from 'react'
import { reducer, initialState, State, Action } from './reducer'

export interface GlobalContext {
    state: State,
    dispatch: Dispatch<Action>
}

export const Context = createContext <GlobalContext> ({
    state: initialState,
    dispatch: () => null
})

declare interface ContextProps {
    children: ReactElement
}

export const ContextProvider: FC<ContextProps> = ({ children } : ContextProps ) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            { children }
        </Context.Provider>
    )
}