import React from 'react'
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import PaletteMetaForm from './PaletteMetaForm';


    function PaletteFormNav(props){

    const {classes,open,handleSubmit,handleDrawerOpen,palettes } = props;
    
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
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                    </Typography>
                    
                    </Toolbar>
                <div className={classes.navBtn}>
                    
                    <PaletteMetaForm 
                    handleSubmit={handleSubmit}
                    palettes={palettes}/>
                    <Link to='/'>
                        <Button
                            variant="contained"
                            color="secondary">
                            Go Back
                            </Button>
                    </Link>
                </div>
                </AppBar>
        </div>
    )


} 
export default PaletteFormNav;