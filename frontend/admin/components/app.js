import React from 'react';
import {HashRouter, Route} from "react-router-dom";
import LoginContainer from "./login/login_container";
import ProductsContainer from "./products/products_container";
import {Provider} from "react-redux";
import ProductsIndex from "./products/products_index";
export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Provider store={this.props.store}>
            <HashRouter>
                <div className="app">
                    <Route exact path="/" component={LoginContainer}/>
                    <Route path="/products" render ={props=>(
                        <ProductsContainer>
                            <ProductsIndex/>
                        </ProductsContainer>
                    )}/>
                </div>
            </HashRouter>
        </Provider>;
    }
}