import React from 'react';
import {HashRouter, Route} from "react-router-dom";
import LoginContainer from "./login/login_container";
import ProductsContainer from "./products/products_container";
import {Provider} from "react-redux";
import ProductsIndex from "./products/products_index";
import ProductForm from "./products/product_form";
import NavBar from "./nav_bar";
import Sales from "./sales/sales";
export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Provider store={this.props.store}>
            <HashRouter>
                <div className="app">
                    <NavBar/>
                    <section className="main-content"> 
                        <Route exact path="/" component={LoginContainer}/>
                        <Route exact path="/products" render ={props=>(
                            <ProductsContainer queryParam={'admin=true'}>
                                <ProductsIndex/>
                            </ProductsContainer>
                        )}/>
                        <Route path="/products/:id/edit" component={ProductForm}/>
                        <Route path="/products/new" component={ProductForm}/>
                        <Route path="/sales" component={Sales}/>
                    </section>
                </div>
            </HashRouter>
        </Provider>;
    }
}