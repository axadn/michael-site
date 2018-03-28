import React from "react";
export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <form onSubmit ={this.props.handleSubmit}>
            <input type = "text" placeholder="search"/>
            <button className="search-button" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>;
    }
}