import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



    function PaletteFormNav(props){

        const [newPaletteName, setPaletteName] = useState('');

        const handleChangePalette = (e) => {
            setPaletteName(e.target.value);
        }

        useEffect(() => {
            ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
                return props.palettes.every(
                    ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
                )
            })
        }, [props.palettes]);


        const {classes,open,handleSubmit,handleDrawerOpen } = props;
    
    return (
        <div>
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
                            Persistent drawer
                    </Typography>
                        <ValidatorForm onSubmit={()=> handleSubmit(newPaletteName)}>
                            <TextValidator
                                label="Palette Name"
                                value={newPaletteName}
                                onChange={handleChangePalette}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["this field is required", "Name already exists"]} />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >Save Palette</Button>
                            <Link to='/'>
                                <Button
                                    variant="contained"
                                    color="secondary">
                                    Go Back
                    </Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
        </div>
    )


} 
export default PaletteFormNav;