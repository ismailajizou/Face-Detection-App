const INITIAL_STATE = {
    currentUser: null
    // {
    //     name: 'ismail',
    //     joined: '12-07-2002',
    //     entries: 2
    // }
}

const userReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        default : 
            return state;
    }
}

export default userReducer;