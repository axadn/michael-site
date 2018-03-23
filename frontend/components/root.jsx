import App from "./app";
import React from "react";
import {Provider} from 'react-redux';
export default props => <Provider store={props.store}>
                            <App/>
                            </Provider>
