export interface State {
    isDesktop: boolean
}

export interface Action {
    type: string
    value: boolean
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'setIsDesktop':
            return { ...state, isDesktop: action.value }

        default:
            return state
    }
}

export const initialState: State = {
    isDesktop: false
}