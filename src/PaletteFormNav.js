import React,{useState} from 'react'
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import PaletteMetaForm from './PaletteMetaForm';
import ColorizeIcon from '@material-ui/icons/Colorize';

// styles come rom NewPaletteFormStyles.js and passed rom NewPalleteForm as classes prop.
    function PaletteFormNav(props){
    const [formShowing,setFormShowing]= useState(false)
    const {classes,open,handleSubmit,handleDrawerOpen,palettes } = props;
    
    const showForm = () =>{
        setFormShowing(true);
    }
    const hideForm = () =>{
        setFormShowing(false)
    }
    return (
        <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <ColorizeIcon
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </ColorizeIcon>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                    </Typography>
                    
                    </Toolbar>
                <div className={classes.navBtns}>
                    <Link   
                        className={classes.link } 
                        to='/'>
                        <Button
                            className={classes.navBtn}
                            variant="contained"
                            color="secondary">
                            Go Back
                            </Button>
                    </Link>
                    <Button 
                        className={classes.navBtn}
                        variant="contained" 
                        color="primary" 
                        onClick={showForm}>
                        Save
                    </Button>
                </div>
                </AppBar>
                {formShowing && (
            <PaletteMetaForm
                hideForm ={hideForm}
                handleSubmit={handleSubmit}
                palettes={palettes} />)}
        </div>
    )


} 
export default PaletteFormNav;