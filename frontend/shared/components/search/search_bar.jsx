import React from "react";
import queryString from "query-string";

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render(){
        return <form className="search-bar" onSubmit ={this.handleSubmit}>
            <input type = "text" placeholder="search"/>
            <button className="search-button" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>;
    }
    handleSubmit(e){
        e.preventDefault();
        const address = queryString.parseUrl(window.location.toString());
        address.query.query = e.target.querySelector('input').value;
        window.location = `${this.props.redirectUrl}?${queryString.stringify(address.query)}`;
    }

}