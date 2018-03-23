import React from 'react';
export default props=>{
return <div className = "product-item">
    <img src={props.product.image_url} 
        onClick={()=>window.location=`/#/products/${props.product.id}`}/>
    <h3 onClick={()=>window.location=`/#/products/${props.product.id}`}>
        {props.product.title}
    </h3>
    <div className="product-price">{props.product.unit_price}</div>
</div>;
}