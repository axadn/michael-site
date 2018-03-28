import React from 'react';
import QuantitySelector from "../shared/quantity_selector";

export default props => <tr>
    <td>{props.item.title}</td>
    <td className="price">
        ${props.item.unit_price}
    </td>
    <td>
        <QuantitySelector max={12} 
        quantity={props.item.quantity}
        handleChange={e=>{
            if(e.target.dataset.value != props.item.quantity)
                props.handleQuantityChange(e)
            }}/>
    </td>
    <td className="price">
        ${props.item.quantity * props.item.unit_price}
    </td>
    <td>
        <button onClick={props.handleDelete}>remove</button>
    </td>
</tr>;

