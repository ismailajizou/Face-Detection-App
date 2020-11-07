const INITIAL_STATE = {
    hidden: true
}

const menuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return {
                ...state,
                hidden: !state.hidden
            }
            
        default:
            return state;
    }
        
}

export default menuReducer;