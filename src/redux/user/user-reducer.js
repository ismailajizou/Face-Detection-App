import arrayBufferToBase64 from '../../utils/utils'
const INITIAL_STATE = {
    currentUser: null,
}

const userReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                //currentUser: action.payload
                currentUser: action.payload ? {
                    ...action.payload,
                    profileimage : `data:image/(png|jpg);base64,${arrayBufferToBase64(action.payload.profileimage.data)}`
                } : action.payload
            };
        default : 
            return state;
    }
}

export default userReducer;