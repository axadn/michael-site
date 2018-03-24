import React from "react";

export default class QuantitySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {active: false};
        this.handleClick = this.handleClick.bind(this);
        this.hide = this.hide.bind(this);
    }
    handleClick(e){
        this.activateEvent = e.nativeEvent;
        this.setState(state=>{
            if(!state.active){
                window.addEventListener("click", this.hide);
                return {active: true};
            }
        });
    }
    hide(exitEvent){
        if (exitEvent != this.activateEvent){
            this.setState({active: false});
            window.removeEventListener("click", this.hide);
        }

    }
    render(){
        let list = "";
        if(this.state.active){
            const listItems = [];
            for(let i = 1; i <= this.props.max; ++i){
                listItems.push(
                    <div key={`quantity-selector-item${i}`} data-value={i}>
                        {i}
                    </div>
                )
            }
            list =  
            <div className="quantity-selector-list"
                onClick={this.props.handleChange}
            >
                {listItems}
            </div>;
        }
        
        return <div className="quantity-selector" onClick={this.handleClick}>
            <div className="quantity-selector-value">
                <a className="quantity-selector-label">QTY: {this.props.quantity}</a>
            </div>
            {list}
        </div>;
    }
}