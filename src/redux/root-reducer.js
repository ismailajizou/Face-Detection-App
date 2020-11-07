import { combineReducers } from "redux";
import menuReducer from "./menu/menu-reducer";
import modalReducer from "./modal/modal-reducer";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    modal: modalReducer
});

export default rootReducer;





