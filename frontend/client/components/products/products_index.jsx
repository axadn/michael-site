import React from "react";
import ProductItem from "SharedComponents/products/product_item";

export default class ProductsIndex extends React.Component{
    constructor(props){
        super(props);
    }
    handleProductSelected(id){
        window.location=`/#/products/${id}`;
    }
    render(){
        return <div className ="products-index">
            {this.props.products.map(product=><ProductItem key={`product${product.id}`} 
                product={product} handleSelected={this.handleProductSelected}/>)}
        </div>;
    }
}