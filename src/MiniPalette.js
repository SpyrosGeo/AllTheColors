import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';



function MiniPalette(props ){
    const { classes,paletteName,colors }= props;
    const miniColorBoxes= colors.map(color =>(
        <div key={color.name}className={classes.miniColor} style={{backgroundColor:color.color}}></div>
    ))
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon 
                className={classes.deleteIcon}
                style={{transition:"all 0.3s ease-in-out"}}
                />
            </div>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName}</h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);