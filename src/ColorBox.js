import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import "./ColorBox.css"
import {CopyToClipboard} from "react-copy-to-clipboard";



class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied:false
        };
        this.changeCopyState = this.changeCopyState.bind(this);
    }


    changeCopyState(){
        this.setState({
            copied:true
        },()=>{
            setTimeout(()=>this.setState({
                copied:false
            }),1500);
        })
    }
    render(){
        const {name,background,moreUrl,showLink}=this.props;
        const  { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.6;
        const lightColor = isLightColor &&"dark-text";
        
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className="ColorBox">
                <div style={{background}} className={`copy-overlay ${copied &&"show"}`} />
                    <div className={`copy-message ${copied && "show"}`}>
                    <h1>Copied!</h1>
                        <p className={isLightColor ? "dark-text":''}>{background}</p>
                </div>
                      <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor ? "light-text":""}>{name}</span>
                        </div>
                        <button className={`copy-button ${lightColor}`}>Copy</button>
                    </div>
                    {showLink &&(
                    <Link to={moreUrl}onClick={e => e.stopPropagation()}>
                        <span className={`see-more ${lightColor}`}>MORE</span>
                    </Link>)}
                </div>
            </CopyToClipboard>
           
        );
    }
}
export default ColorBox;

