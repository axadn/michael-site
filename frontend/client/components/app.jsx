import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Home from "./home/home";
import Products from "SharedComponents/products/products";
import ProductShow from "./products/product_show";
import ProductsIndex from "./products/products_index";
import NavBar from "./nav_bar/nav_bar";
import Cart from "./cart/cart";
export default props=> <HashRouter>
    <div className = "app">
        <NavBar/>
        <div className = "main-content">
            <Route exact path = "/" component={Home}/>
            <Route exact path="/products" render ={props=>(
                <Products>
                    <ProductsIndex/>
                </Products>
                )}
            />
            <Route path="/products/:product_id" component={ProductShow}/>
            <Route path="/cart" component={Cart}/>
        </div>
    </div>    
</HashRouter>