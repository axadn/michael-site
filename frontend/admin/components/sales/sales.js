import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import queryUtil from 'query-string';

class Sales extends React.Component{
    constructor(props){
        super(props);
        this.state = {titles: [], histogram: [], total: 0, query: {}};
        this.drawCanvas = this.drawCanvas.bind(this);
    }
    recieveQuery(queryString){
        if(!queryString){
            const now = new Date();
            queryString = `?month=${now.getMonth() + 1}&year=${now.getFullYear()}`;
        }
        window.q = queryUtil;
        debugger;
        const query = queryUtil.parse(queryString);
        this.setState((state => Object.assign({}, state, {query})));
        this.fetchData(queryString);
    }
    componentDidMount(){
        this.recieveQuery(this.props.location.search);
    }
    componentWillReceiveProps(newProps){
        if(this.props.location.search != newProps.location.search){
            this.recieveQuery(newProps.location.search);
        }
    }

    fetchData(queryString){
        axios.get(`/api/sales.json${queryString}`).then(
            result => {
                this.setState(
                    (state, props)=>
                    Object.assign(
                        {},
                        state,
                        {total: result.data.histogram.reduce((accum, tuple)=> accum+tuple[1]),
                        histogram: result.data.histogram,
                        titles: result.data.titles}),
                    this.drawCanvas
                )
            }
        );
    }
    drawCanvas(){
        let canvas = document.querySelector(".sales-histogram");
        let context = canvas.getContext('2d');
        context.clearRect(0,0,canvasWidth, canvasHeight);
        const daysInMonth = new Date(
            this.state.query.year,
            this.state.query.month, //javaScript's months are zero based, but our database's aren't /
            // so this gets the next month
            0 //0 gets the last day of the previous 
        ).getDate();
        const max = this.state.histogram.reduce((accum, tuple)=>(accum > tuple[1] ? accum : tuple[1]), 0);
        const blipSize = 4;
        const padding = 4;
        let canvasWidth = canvas.clientWidth - padding * 2;
        let canvasHeight = canvas.clientHeight - padding * 2;
        let idx = 0;
        context.fillStyle = "black";
        debugger;
        let quantity;
        for(let day = 1; day <= daysInMonth; ++day){
            if(idx < this.state.histogram.length && this.state.histogram[idx][0] == day){
                quantity = this.state.histogram[idx ++][1]
            }else{
                quantity = 0;
            }
            context.fillRect((day - 1) * canvasWidth / daysInMonth - blipSize / 2 + padding,
                    canvasHeight - canvasHeight * quantity  /
                         max - blipSize /2 + padding,
                    blipSize,blipSize 
                );
        } 
    }
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return <section className="sales-component">
            <canvas className= "sales-histogram"></canvas>
        </section>;
    }
}

export default withRouter(Sales);