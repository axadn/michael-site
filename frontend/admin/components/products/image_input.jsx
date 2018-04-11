import React from "react";

export default class UpdatableImage extends React.Component{
  constructor(props){
    super(props);
    this.state = {src: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e){
    const file = e.target.files[0];
    this.setState({src: URL.createObjectURL(file)});
    if(this.props.handleFile){
        this.props.handleFile(file);
    }
  }
  handleRevert(e){
    e.preventDefault();
    this.setState({src: null});
    if(this.props.handleFile){
      this.props.handleFile(null);
    }
    this.inputButton.value = "";
  }
  handleClick(e){
    e.preventDefault();
    this.inputButton.click()
  }
  render(){
    let button;
    const src = this.state.src || this.props.src;
    return <div className="image-input-container">
      <img className="product-image" src={src}/>
      <input type="file" className="image-input"
        ref={inputButton => this.inputButton = inputButton}
        onChange={this.handleChange}></input>
      <button
         onClick={this.handleClick}>
          <i className="fa fa-file-image-o" aria-hidden="true"></i>
          {" Update Image"}
      </button>
      {
        this.state.src ?
          <button 
            onClick={this.handleRevert}>
            <i className="fa fa-undo" aria-hidden="true"></i>
            {" Revert"}
          </button>
        :
        ""
      }
    </div>;
  }

}
