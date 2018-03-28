import React from 'react';
import SessionMenu from "./session_menu/session_menu";
import SearchBar from "../search/search_bar";
function handleSearch(e){
    e.preventDefault();
    window.location=`/#/products/?query=${
        e.target.querySelector('input').value}`
}
export default props => <div className = "nav-bar">
    <a href="/#/" className="nav-bar-logo nav-bar-link">Michael's Underwear</a>
    <a href="/#/products" className="nav-bar-link">Shop Now</a>
    <div className="nav-bar-right-side">
        <SessionMenu/>
        <i className="fa fa-shopping-cart nav-bar-icon" aria-hidden="true"
            onClick={()=>window.location="/#/cart"}
        ></i>
        <SearchBar handleSubmit={handleSearch}/>
    </div>
</div>;