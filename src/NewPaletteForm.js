import React,{ useState,useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height:"calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function NewPaletteForm(props){
    const classes = useStyles();
    const theme = useTheme();
    const[open, setOpen] = React.useState(false);
    const[curColor, setCurColor] = useState("teal");
    const[colors, setColors] = useState([]);
    const[newName, setNewName] = useState('');
    
    //dont forget to return or it ll always show error
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique',value =>{
           return colors.every(
                ({ name }) =>name.toLowerCase()!== value.toLowerCase()
            )
        })
    }, [colors]);
    //dont forget the curColor needs to be in the array that useEffect looks for changes
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique',value =>{
           return colors.every(
                ({ color }) =>color !== curColor
            )
        })
    }, [colors,curColor]);

    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const updateCurColor=(newColor)=>{
        setCurColor(newColor.hex);
        
    }
    const addNewColor = () =>{
        const newColor= {color:curColor,name:newName}
        setNewName("");
        setColors([...colors,newColor])
    }
    const handleChange =(e) =>{
        setNewName(e.target.value)
    }
    const handleSubmit = ()=>{
        let newName ="New Test Palette"
        const newPalette ={
            paletteName:newName,
            colors:colors,
            id:newName.toLowerCase().replace(/ /g,"-")
        }
        props.savePalette(newPalette);
        //redirect
        props.history.push('/')
    }

    return(
    <div className = { classes.root } >
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >Save Palette</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Typography variant ="h4">Design Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
                </div>
                <ChromePicker
                    color={curColor}
                    onChangeComplete={updateCurColor} />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator 
                    value={newName}
                    onChange={handleChange}
                    validators={['required','isColorNameUnique','isColorUnique']}
                        errorMessages={['this field is required', 'name needs to be unique', 'color needs to be unique']} />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ backgroundColor: curColor }}> Add Color</Button>
                </ValidatorForm>
                
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
               
                {colors.map(color =>(
               <DraggableColorBox 
                    color={ color.color }
                    name={ color.name } />
               ))}
            </main>
    </div>
  );
}