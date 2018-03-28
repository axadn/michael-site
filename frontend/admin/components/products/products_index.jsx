import React from "react";
import ProductItem from "SharedComponents/products/product_item";
import ProductItemAdminOptions from "./product_item_admin";

export default class ProductsIndex extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className ="products-index">
        {this.props.products.map(product=>(
            <ProductItem key={`product${product.id}`} product={product}>
                <ProductItemAdminOptions/>
            </ProductItem>
        ))}
        </div>;
    }
}