const INITIAL_STATE = {
    isModalOpen: false
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL_OPEN':
            return {
                ...state,
                isModalOpen: action.payload
            }
            
        default:
            return state;
    }
        
}

export default modalReducer;