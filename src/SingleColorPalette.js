import React, { Component } from 'react';
import ColorBox from './ColorBox';


class SingleColorPalette extends Component{
    constructor(props){
        super(props);
        this._shades =this.gatherShades(this.props.palette, this.props.colorId);
        // this.gatherShades = this.gatherShades.bind(this);
        // console.log(this._shades);
    }
    gatherShades(palette,colorToFilterBy){
        let shades=[];
        console.log(palette);
        let allColors = palette.colors;
        console.log(allColors);
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color=> color.id === colorToFilterBy)
            )
            
        }
        //return all shades of given color
        return shades.slice(1);
    }
    render(){
        const colorBoxes = this._shades.map(color =>(
            <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false}/>
        ))
        // console.log(colorBoxes)
        return(
            <div className="Palette">
                <h1>test</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }


}
export default SingleColorPalette;