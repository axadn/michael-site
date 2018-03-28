import React from 'react';
import QuantitySelector from "../shared/quantity_selector";

export default props => <div className="cart-item">
    <h4>{props.item.title}</h4>
    <div>
        ${props.item.unit_price}
    </div>
    x
    <QuantitySelector max={12} 
    quantity={props.item.quantity}
    handleChange={e=>{
         if(e.target.dataset.value != props.item.quantity)
            props.handleQuantityChange(e)
        }}/>
    <div className ="price">
        ${props.item.quantity * props.item.unit_price}
    </div>
    <button onClick={props.handleDelete}>remove</button>
</div>;

