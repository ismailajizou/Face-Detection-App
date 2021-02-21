const INITIAL_STATE = {
    image: '',
    src: '',
    isProfileLoading: false
}

const profileReducer = (state=INITIAL_STATE , action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                image: action.payload.image,
                src: action.payload.src,
                isProfileLoading: action.payload.isProfileLoading
            }
        default:
            return state;
    }
}
export default profileReducer;