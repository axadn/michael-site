import React from "react";
import ProductItem from "./product_item";
export default props=>{
    return <div className ="products-index">
        {props.products.map(product=><ProductItem key={`product${product.id}`} product={product}/>)}
    </div>
};