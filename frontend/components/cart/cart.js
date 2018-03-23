import React from "react";
import axios from "axios";
import CartItem from "./order_item";
export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {items: [], loading: true};
    }

    componentDidMount(){
        this.fetchCart();
    }

    fetchCart(){
        axios.get('/api/cart.json').then(
            result => this.setState(Object.assign({}, this.state,
                {items: result.data, loading: false})));
    }

    handleQuantityChange(order_item_id){
        return e => axios.put('/api/cart.json',{
            type: "UPDATE_QUANTITY",
            order_item_id,
            quantity: e.target.value
        }).then(
            result=> this.setState(Object.assign({},this.state,
                 {items: result.data}))
        );
    }

    handleDelete(order_item_id){    
        return e => axios.put('/api/cart.json',{
            type: "DELETE_ITEM",
            order_item_id,
        }).then(
            result=> this.setState(Object.assign({},this.state,
                 {items: result.data}))
        );
    }

    render(){
        const content = this.state.loading ?
            <h3>Loading...</h3> :
            <ul>
            {
                this.state.items.map(item=>
                    <li key={`cartItem${item.id}`}>
                        <CartItem item ={item} 
                        handleQuantityChange={this.handleQuantityChange(item.id)}
                        handleDelete={this.handleDelete(item.id)}
                        />
                    </li>
                )
            }
            </ul>;
        return <div className ="cart">
            {content}
        </div>;
    }
}