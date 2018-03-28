import {RECEIVE_LOGGED_IN, DESTROY_LOGGED_IN} from "../actions/session_actions";
export default (state, action) =>{
    switch(action.type){
        case RECEIVE_LOGGED_IN:
            return {logged_in: true}
            break;
        case DESTROY_LOGGED_IN:
            return {logged_in: false}
            break;
        default:
            return state;
    }
}