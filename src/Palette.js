import React, { Component } from 'react';
import ColorBox from './ColorBox';
import "./Palette.css"

class Palette extends Component {


    render(){
        const colorboxes = this.props.colors.map(color =>(
            <ColorBox background={color.color} name={color.name} />
        ))
        return (
            <div className="Palette">
                {/* navbar goes here */}
                <div className="Palette-colors">
                {/* color boxes go here */}
                {colorboxes}
                </div>
                {/* footer goes here  */}
            </div>
        );
    }
}

export default Palette;