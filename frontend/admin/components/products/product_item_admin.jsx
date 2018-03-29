import React from 'react';
export default class ProductItemAdminOptions extends React.Component{
    render(){
        return <div className ="product-admin-options">
            {this.props.active ? 
            null:
                <div className ="product-inactive-overlay">
                    <a> inactive </a>
                </div> 
            }
            <input className = "product-admin-checkbox" type="checkbox" 
                checked={this.props.selected ? true : false} 
                onChange={this.props.handleCheckChange}
                value={this.props.id}/>
            <button className="product-admin-edit-button" 
                onClick={()=>window.location = `/admin#/products/${this.props.id}/edit`}>
                edit
            </button>
        </div>;
    }
}