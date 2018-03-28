export const RECEIVE_LOGGED_IN = "RECEIVE_LOGGED_IN";
export const DESTROY_LOGGED_IN = "DESTROY_LOGGED_IN";

export const log_in_action =()=>({
    type: RECEIVE_LOGGED_IN
});

export const log_out_action = ()=>({
    type: DESTROY_LOGGED_IN
});