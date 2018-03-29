import React from "react";
import ProductItem from "SharedComponents/products/product_item";
import ProductItemAdminOptions from "./product_item_admin";
import axios from "axios";

export default class ProductsIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {selected: {}};
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd(){
        window.location = 'admin#/products/new'
    }
    handleUpdate(type){
        return e =>{
            axios.put(`/api/products.json`, {type,
                ids: Object.keys(this.state.selected)})
            .then(
                result=> this.props.fetch()
            )
        }
    }
    handleCheckChange(e){
        if(e.target.checked){
            this.setState(
                Object.assign({}, this.state,
                    {selected: 
                        Object.assign({}, this.state.selected, {[e.target.value]: e.target.checked})
                    }
                )
            );
        }
        else{
            const selected = {};
            Object.keys(this.state.selected).forEach(key=>{
                if(key != e.target.value){
                    selected[key] = true;
                }
            });
            this.setState(
                Object.assign({}, this.state, {selected})
            );
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({selected: {}});
    }
    render(){
        return<div className ="admin-products-index-wrapper" onClick={this.handleClick}>
            <div className ="admin-products-index-controls">
                <span className="admin-products-selected-count"> 
                   ({Object.keys(this.state.selected).length } selected)
                </span>
                <button onClick={this.handleUpdate('DELETE')}> <i className="fa fa-trash-o" aria-hidden="true"></i> delete</button>
                <button onClick={this.handleUpdate('SET_ACTIVE')}> <i className="fa fa-toggle-on" aria-hidden="true"></i> set active</button>
                <button onClick={this.handleUpdate('SET_INACTIVE')}> <i className="fa fa-toggle-off" aria-hidden="true"></i> set inactive</button>
                <button onClick={this.handleAdd}> <i className="fa fa-plus" aria-hidden="true"></i> new</button>
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