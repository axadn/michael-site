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
        return e =>{
            axios.put('/api/cart.json',{
            type: "UPDATE_QUANTITY",
            order_item_id,
            quantity: e.target.dataset.value
        }).then(
            result=> this.setState(Object.assign({},this.state,
                 {items: result.data}))
        );
    }
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
            "" :
            <table className="cart-table">
                <tr>
                    <th>ITEM</th>
                    <th>EACH</th>
                    <th></th>
                    <th></th>
                    <th>TOTAL</th>
                    <th></th>
                    <th></th>
                </tr>
            {
                this.state.items.map(item=>
                        <CartItem item ={item} 
                        key={`cartItem${item.id}`}
                        handleQuantityChange={this.handleQuantityChange(item.id)}
                        handleDelete={this.handleDelete(item.id)}
                        />
                )
            }
            </table>;
        return <div className ="cart">
            <h2> Your Cart</h2>
            {content}
        </div>;
    }
}