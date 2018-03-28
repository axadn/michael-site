import React from 'react';
export default class ProductItem extends React.Component{
    render(){
        return <div className = "product-item">
            <img src={this.props.product.image_url} 
                onClick={()=>window.location=`/#/products/${this.props.product.id}`}/>
            <h3 onClick={()=>window.location=`/#/products/${this.props.product.id}`}>
                {this.props.product.title}
            </h3>
            <div className="price">${this.props.product.unit_price}</div>
            {this.props.children}
        </div>;
    }
}