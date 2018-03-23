import React from "react";
import ProductsIndex from "./products_index";
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
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    handleCategoryChange(e){
        const newCategoryValues = Object.assign({},
             this.state.categories, {[e.target.value]: e.target.checked});
        this.setState(Object.assign({}, this.state, {categories: newCategoryValues}));
    }
    componentDidMount(){
        this.fetchProducts(this.props.location.search);
    }
    componentWillReceiveProps(newProps){
        if(this.props.location.search != newProps.location.search){
            this.fetchProducts(newProps.location.search);
        }
    }
    fetchProducts(queryString){
        this.setState(Object.assign({}, this.state, {loading: true}));
        axios.get(`/api/products.json?${queryString}`)
        .then(
            response=>{ 
                this.setState(Object.assign({}, this.state,
                 {results: response.data, loading: false}))
            }
        );
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
             <ProductsIndex loading={this.state.loading} products={this.state.results}/>
        </div>
    }
}
export default withRouter(Products);