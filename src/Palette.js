import React, { Component } from 'react';
import ColorBox from './ColorBox';
import "./Palette.css"
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';


class Palette extends Component {

    constructor(props){
        super(props);
        this.state= {
        level:500,
        format:"hex"
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level){
        this.setState({
            level:level
        })
    }
    changeFormat(val){
        this.setState({
            format:val
        })
    }
    render(){
        const { colors,paletteName,id} = this.props.palette;
        const { level,format } = this.state;
        const colorboxes = colors[level].map(color =>(
            <ColorBox 
                background={color[format]} 
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true}
            />
        ))
        return (
            <div className="Palette">
                <NavBar level={level} 
                changeLevel={this.changeLevel} 
                handleChange={this.changeFormat} 
                allColors={true}
                />
                
                <div className="Palette-colors">
                {/* color boxes go here */}
                {colorboxes}
                </div>
                <PaletteFooter paletteName={paletteName}/>
            </div>
        );
    }
}

export default Palette;