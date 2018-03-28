import {connect} from "react-redux";
import Login from "./login";
import {log_in_action} from "../../actions/session_actions";

const mapDispatchToProps = dispatch =>({
    dispatch_log_in: () => dispatch(log_in_action())
});

export default connect(null, mapDispatchToProps)(Login);