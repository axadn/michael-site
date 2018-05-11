import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

class Sales extends React.Component{
    constructor(props){
        super(props);
        this.state = {products: [], histogram: [], total: 0};
    }
    componentDidMount(){
        debugger;
        this.fetchData(this.props.location.search);
    }
    componentWillReceiveProps(newProps){
        if(this.props.location.search != newProps.location.search){
            this.fetchData(newProps.location.search);
        }
    }
    fetchData(queryString){
        axios.get(`/api/sales.json${queryString}`).then(
            result => {
                debugger;
            }
        );
    }
    render(){
        return <section className="sales-component">

        </section>;
    }
}

export default withRouter(Sales);