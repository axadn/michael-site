import React from 'react';

export default props => <div className="cart-item">
    <h4>{props.item.title}</h4>
    <div>${props.item.unit_price}</div>
    X
    <input type="number" step="1" min="0"
         value={props.item.quantity}
          onChange={props.handleQuantityChange}/>
    <div className ="order-item-total">
        {props.item.quantity * props.item.unit_price}
    </div>
    <button onClick={props.handleDelete}>remove</button>
</div>;