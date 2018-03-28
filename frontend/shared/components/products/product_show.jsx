import React from 'react';
import {withRouter} from "react-router-dom";
import QuantitySelector from "../shared/quantity_selector";
import axios from "axios";
class ProductShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {product: {}, loading: true, quantity: 1}
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    componentDidMount(){
        this.fetchProduct();
    }
    componentWillReceiveProps(newProps){

    }
    handleQuantityChange(e){
        const quantity = e.target.dataset.value;
        this.setState(Object.assign({}, this.state, {quantity}));
    }
    handleAddToCart(e){
        axios.put(`/api/cart.json`, {
            type: "ADD_ITEM",
            product_id: this.state.product.id,
            quantity: this.state.quantity
        })
        .then(()=>window.location = "/#/cart");
    }
    fetchProduct(){
        this.setState(Object.assign({}, this.state, {loading: true}));
        axios.get(`/api/products/${this.props.match.params.product_id}.json`)
            .then(
                result=> this.setState(Object.assign({}, this.state, {loading: false,
                    product: result.data}))
            )
    }
    render(){
        const content = this.state.loading?
         <div className="product-show">Loading...</div>:
        <div className="product-show">
            <img className="product-show-img" src={this.state.product.image_url}/>
            <div className="product-show-right">
                <h3 className="product-show-title">{this.state.product.title}</h3>
                <div className="price">${this.state.product.unit_price}</div>
                <div className="product-show-quantity-selection">
                    <QuantitySelector max={12} 
                        quantity={this.state.quantity}
                        handleChange={this.handleQuantityChange}/>
                    
                    <button onClick={this.handleAddToCart}> Add To Cart </button>
                </div>
                <div className="product-show-description">{this.state.product.description}</div>
            </div>
        </div>
        return content;
    }
}

export default withRouter(ProductShow);