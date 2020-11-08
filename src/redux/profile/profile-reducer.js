const INITIAL_STATE = {
    image: '',
    src: ''
}

const profileReducer = (state=INITIAL_STATE , action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                image: action.payload.image,
                src: action.payload.src
            }
        default:
            return state;
    }
}
export default profileReducer;