import React, { Component } from 'react';
import ColorBox from './ColorBox';
import "./Palette.css"
import NavBar from './NavBar';


class Palette extends Component {

    constructor(props){
        super(props);
        this.state= {
        level:500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(level){
        this.setState({
            level:level
        })
    }

    render(){
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorboxes = colors[level].map(color =>(
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className="Palette">
                <NavBar level={level} changeLevel={this.changeLevel} />
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