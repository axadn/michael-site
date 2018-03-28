import {connect} from "react-redux";
import Products from "SharedComponents/products/products";

const mapStateToProps = state=> ({
    logged_in: state.logged_in
});

export default connect(mapStateToProps)(Products);