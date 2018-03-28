import React from 'react';
export default class ProductItemAdminOptions extends React.Component{
    render(){
        return <div className ="product-admin-options">
            {this.props.active ? "active" : "inactive"}
            <input type="checkbox" checked={this.props.selected ? true : false} 
                onChange={this.props.handleCheckChange}
                value={this.props.id}/>
        </div>;
    }
}