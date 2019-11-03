import React,{ useState,useEffect } from 'react'
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';
import { ValidatorForm} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';


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
     //instead of static defaultProps in a functinal component we use this     
    let maxColors = {
        max:20
    }
    const classes = useStyles();
    const theme = useTheme();
    const[open, setOpen] = React.useState(false);
    const[curColor, setCurColor] = useState("teal");
    const[colors, setColors] = useState(props.palettes[0].colors);
    const[newName, setNewName] = useState('');
   
    
    //dont forget to return or it ll always show error
    // these validators seem to work for children components may move them later.
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
    
    const addNewColor = (newColor) =>{
        setNewName("");
        setColors([...colors,newColor])
    }
    
    
    const handleSubmit = (newPaletteName)=>{
        
        const newPalette ={
            paletteName:newPaletteName,
            colors:colors,
            id:newPaletteName.toLowerCase().replace(/ /g,"-")
        }
        props.savePalette(newPalette);
        //redirect
        props.history.push('/')
    }
    const deleteColor = (colorName) =>{
        setColors(colors.filter(color => color.name !== colorName))

    }
    const onSortEnd = ({oldIndex,newIndex})=>{
        setColors(arrayMove(colors,oldIndex,newIndex))
    }
    const clearPalette = ()=>{
        setColors([]);
    }
    const addRandomColor = () =>{
        const allColors = props.palettes.map(p=>p.colors).flat();
        var rand = Math.floor(Math.random()*allColors.length);
        const randomColor = allColors[rand];
        setColors([...colors,randomColor]);
    }


    const paletteIsFull = colors.length >= maxColors.max;
    

    return(
        <div  className={classes.root}>
            <PaletteFormNav 
                open={open} 
                classes={classes}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
                />
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
                    <Button variant="contained" color="secondary" onClick={clearPalette}>Clear Palette</Button>
                    <Button variant="contained" color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}>Random Color</Button>
                </div>
                <ColorPickerForm 
                    paletteIsFull={paletteIsFull}
                    addNewColor = {addNewColor}
                />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className = {classes.drawerHeader} />
                <DraggableColorList
                    axis='xy'
                    colors={colors}
                    deleteColor={deleteColor}
                    onSortEnd={onSortEnd}>

                    </DraggableColorList>
             
            </main>
    </div>
  );
}