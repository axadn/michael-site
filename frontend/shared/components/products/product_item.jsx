import React from 'react';
export default class ProductItem extends React.Component{
    render(){
        return <div className = "product-item">
            <img className="product-image" src={this.props.product.image_url} 
                onClick={()=>this.props.handleSelected ? this.props.handleSelected(this.props.product.id) : null}/>
            <h3 onClick={()=>this.props.handleSelected ? this.props.handleSelected(this.props.product.id) : null}>
                {this.props.product.title}
            </h3>
            <div className="price">${this.props.product.unit_price}</div>
            {this.props.children}
        </div>;
    }
}