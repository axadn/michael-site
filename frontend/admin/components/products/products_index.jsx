import React from "react";
import ProductItem from "SharedComponents/products/product_item";
import ProductItemAdminOptions from "./product_item_admin";

export default class ProductsIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {selected: {}};
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }
    handleCheckChange(e){
        this.setState(
            Object.assign({}, this.state,
                {selected: 
                    Object.assign({}, this.state.selected, {[e.target.value]: e.target.checked})
                }
            )
        );
    }
    componentWillReceiveProps(newProps){
        this.setState({selected: {}});
    }
    render(){
        return<div className ="admin-products-index-wrapper" onClick={this.handleClick}>
            <div className ="admin-products-index-controls">
                <button>delete</button>
                <button>set active</button>
                <button>set inactive</button>
                <span className="admin-products-selected-count"> 
                   ({Object.keys(this.state.selected).length } selected)
                </span>
                <button>new</button>
            </div>
            <div className ="products-index">
            {this.props.products.map(product=>{
                return <ProductItem key={`product${product.id}`} product={product}>
                    <ProductItemAdminOptions active={product.active} id={product.id} 
                        selected={this.state.selected[product.id]}
                        handleCheckChange={this.handleCheckChange}/>
                </ProductItem>
            })}
            </div>
        </div>
    }
}