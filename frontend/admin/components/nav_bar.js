import {NavLink} from "react-router-dom";
import React from "react";
export default props => <header className ="admin-nav-bar">
    <NavLink to="/products">Products</NavLink>
    <NavLink to="/sales">Sales</NavLink>
</header>;