import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';


class SingleColorPalette extends Component{
    constructor(props){
        super(props);
        this._shades =this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format:"hex"
        };
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette,colorToFilterBy){
        let shades=[];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color=> color.id === colorToFilterBy)
            )
            
        }
        //return all shades of given color
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({
            format: val
        })
    }

    render(){
        const { format } = this.state;
        const { paletteName,id } =this.props.palette;
        // console.log(paletteName+"single color")
        const colorBoxes = this._shades.map(color =>(
            <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false}/>
        ))
        // console.log(colorBoxes)
        return(
            <div className="SingleColorPalette Palette">
                <NavBar 
                handleChange={this.changeFormat} 
                allColors={false}
                />
            <div className="Palette-colors">
            {colorBoxes}
            <div className="go-back ColorBox">
                <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
            </div>
            </div>
            <PaletteFooter paletteName={paletteName}/>
            </div>
        );
    }


}
export default SingleColorPalette;