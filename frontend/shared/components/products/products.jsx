import React from "react";
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import axios from "axios";
class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {categories: {}, results: [], loading: true};
        this.categories = ["underwear", "swimsuits"];
        this.categories.forEach(category=>{
            this.state.categories[category] = false;
        });
        this.receiveResults = this.receiveResults.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    handleCategoryChange(e){
        const newCategoryValues = Object.assign({},
             this.state.categories, {[e.target.value]: e.target.checked});
        this.setState(Object.assign({}, this.state, {categories: newCategoryValues}));
        const address = queryString.parseUrl(window.location.toString());
        address.query.categories = this.generateCategoriesString(newCategoryValues);
        window.location = `${address.url}?${queryString.stringify(address.query)}`;
    }
    componentDidMount(){
        this.fetchProducts(this.props.location.search);
    }

    componentWillReceiveProps(newProps){
        if(this.props.location.search != newProps.location.search){
            this.fetchProducts(newProps.location.search);
        }
    }
    generateCategoriesString(categories){
        return Object.keys(categories)
        .filter(key=>categories[key])
        .join(" ");
    }
    fetchProducts(currentString){
        this.setState(Object.assign({}, this.state, {loading: true}));
        axios.get(`/api/products.json${currentString}`)
        .then(
            response=>{ 
                this.receiveResults(response.data)
            }
        );
    }
    receiveResults(results){
        this.setState(Object.assign({}, this.state,
            {results, loading: false}));
    }
    render(){
        const checkBoxes = this.categories.map(category=>{
            return <li key ={`category-${category}`} >
                <label >
                    <input type="checkbox" value={category}
                        onChange={this.handleCategoryChange}
                    ></input>
                    {category}
                </label>
            </li>;

        });
        return <div className = "product-page">
            <div className = "product-search-options">
                <ul>
                    {checkBoxes}
                </ul>
            </div>
            {React.cloneElement(this.props.children, { loading: this.state.loading,
                 products: this.state.results, fetch: ()=> this.fetchProducts(this.props.location.search) })}
        </div>
    }
}
export default withRouter(Products);