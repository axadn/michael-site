import React from "react";
import axios from "axios";
export default class ProductForm extends React.Component{
    constructor(props){
        super(props);
        this.categories = ["underwear", "swimsuit"]
        this.state ={loading: true, errors: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.match.params.id){
            this.setState({loading: true});
            this.fetch(this.props.match.params.id);
        }
        else{
            this.setState({loading: false, product: {}});
        }
    }
    componentWillReceiveProps(){
        if(this.props.match.params.id != newProps.match.params.id){
            this.setState({loading: true});
            this.fetch(newProps.match.params.id);
        }
    }
    fetch(id){
        axios.get(`/api/products/${id}.json`)
        .then(result => this.setState(Object.assign({}, this.state,
             {loading: false, product: result.data })));
    }
    handleChange(key){
        return e=>{
            const product = Object.assign({}, this.state.product,
                {[key]: e.target.value});
            this.setState(
                Object.assign({},this.state, {product})
            );
        }
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/api/products.json', {product: this.state.product})
        .then(result =>{
            window.location = '/admin#/products'
        })
        .catch(error=>{
            this.setState(Object.assign({}, this.state, {errors: error.response.data}))
        });
    }
    render(){
        const formTitle = this.props.match.params.id ?
            "Edit Product"
            :
            "New Product"
        ;
        const content = this.state.loading ? 
            ""
        : <form className = "product-form" onSubmit={this.handleSubmit}>
            <div className = "form-row">
                <label htmlFor="image-input">image</label>
                <input id="image-input" type="file"/>
            </div>
            <div className = "form-row">
                <label htmlFor="title">Title</label>
                <input type="text" value={this.state.product.title} 
                    id="title" onChange={this.handleChange("title")}/>
                
            </div>
            <div className = "form-row">
                <label htmlFor="description">description</label>
                <textarea value={this.state.product.description}
                    id="description" onChange={this.handleChange("description")}></textarea>
            </div>
            <div className = "form-row">
                <label htmlFor="unit-price">unit price</label>
                <input value={this.state.product.unit_price} 
                    id ="unit-price" onChange={this.handleChange("unit_price")} type="number" min="0"/>
            </div>
            <div className = "form-row">
                <label htmlFor="category">category</label>
                <select id="category" value={this.state.product.category} 
                    onChange={this.handleChange("category")}>
                    {
                        this.categories.map(category=>(
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="form-row">
                <input type="submit"/>
            </div>
        </form>;
        const errors = <ul className = "form-errors">
            {this.state.errors.map(error=>(
                <li key={error}>{error}</li>
            ))}
        </ul>

        return <div className= "product-form-component">
            {errors}
            <h2>{formTitle}</h2>
            {content}
        </div>;
    }
}