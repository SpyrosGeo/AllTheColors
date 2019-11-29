import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';



function MiniPalette(props ){

    const deletePalette = (e)=>{    
        e.stopPropagation();
        openDialog(props.id)
    }
    const { openDialog,classes,paletteName,colors ,handleClick}= props;
    const miniColorBoxes= colors.map(color =>(
        <div key={color.name}className={classes.miniColor} style={{backgroundColor:color.color}}></div>
    ))
    return(
        <div className={classes.root} onClick={handleClick}>
                <DeleteIcon 
                className={classes.deleteIcon}
                style={{transition:"all 0.3s ease-in-out"}}
                onClick={deletePalette}

/>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName}</h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);