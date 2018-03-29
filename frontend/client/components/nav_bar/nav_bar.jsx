import React from 'react';
import SessionMenu from "./session_menu/session_menu";
import queryString from "query-string";
import SearchBar from "SharedComponents/search/search_bar";
export default props => <div className = "nav-bar">
    <a href="/#/" className="nav-bar-logo nav-bar-link">Michael's Underwear</a>
    <a href="/#/products" className="nav-bar-link">Shop Now</a>
    <div className="nav-bar-right-side">
        <SessionMenu/>
        <i className="fa fa-shopping-cart nav-bar-icon" aria-hidden="true"
            onClick={()=>window.location="/#/cart"}
        ></i>
        <SearchBar redirectUrl="/#/products"/> 
    </div>
</div>;