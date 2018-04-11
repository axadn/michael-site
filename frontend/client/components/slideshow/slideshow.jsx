import React from "react";

export default class SlideShow extends React.Component{
   constructor(props){
    super(props);
    this.state = {index:0};
    this.changeSlide = this.changeSlide.bind(this);
   } 
   render(){
       return <div className="slideshow-component">
            <img className="slideshow-image" src={this.props.images[this.state.index]}/>
       </div>;
   }
   changeSlide(){
       this.setState((state,props)=> ({index: (state.index + 1) % this.props.images.length}));
   }
   componentDidMount(){
       this.interval = setInterval(this.changeSlide, this.props.frequency);
   }
   componentWillUnmount(){
       clearInterval(this.interval);
   }
}