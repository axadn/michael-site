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
            <label>Image<input type="file"/></label>
            <label>
                Title<input type="text" value={this.state.product.title} onChange={this.handleChange("title")}/>
            </label>
            <label>description<textarea value={this.state.product.description}
                onChange={this.handleChange("description")}></textarea></label>

            <label>unit price<input value={this.state.product.unit_price} onChange={this.handleChange("unit_price")} type="number" min="0"/></label>
            <label>category
                <select value={this.state.product.category} onChange={this.handleChange("category")}>
                    {
                        this.categories.map(category=>(
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </label>
            <input type="submit"/>
        </form>;
        const errors = <ul className = "form-errors">
            {this.state.errors.map(error=>(
                <li key={error}>{error}</li>
            ))}
        </ul>

        return <div className= "product-form-component">
            {errors}
            {formTitle}
            {content}
        </div>;
    }
}