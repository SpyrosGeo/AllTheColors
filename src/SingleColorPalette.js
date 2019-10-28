import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';


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
        const { classes} = this.props;
        const { paletteName,id } =this.props.palette;
        // console.log(paletteName+"single color")
        const colorBoxes = this._shades.map(color =>(
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]}
                showingFullPalette={false}/>
        ))
        // console.log(colorBoxes)
        return(
            <div className={classes.Palette}>
                <NavBar 
                handleChange={this.changeFormat} 
                allColors={false}
                />
            <div className={classes.paletteColors}>
            {colorBoxes}
            <div className={classes.goBack}>
                <Link to={`/palette/${id}`} >Go Back</Link>
            </div>
            </div>
            <PaletteFooter paletteName={paletteName}/>
            </div>
        );
    }


}
export default withStyles(styles)(SingleColorPalette);