import React,{ useState} from 'react'
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import {  useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from "./seedColors";



export default function NewPaletteForm(props){
     //instead of static defaultProps in a functinal component we use this     
    let maxColors = {
        max:20
    }
    const classes = useStyles();
    const theme = useTheme();
    const[open, setOpen] = React.useState(false);
    const[colors, setColors] = useState(seedColors[0].colors);
    const[setNewName] = useState('');
   
    
    
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const addNewColor = (newColor) =>{
        setColors([...colors,newColor])
        setNewName("");
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
        let rand = Math.floor(Math.random()*allColors.length);
        let randomColor = allColors[rand];
        let isDuplicateColor = true;
        while(isDuplicateColor){
            randomColor = allColors[rand];
           isDuplicateColor= colors.some(color => color.name === randomColor.name);
        }
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
                <div className={classes.container}>
                <Typography 
                    variant ="h4"
                    gutterBottom>
                        Design Palette
                </Typography>
                <div className={classes.buttons}>
                    
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        color="secondary" 
                        onClick={clearPalette}>
                        Clear Palette
                    </Button>
                    
                    <Button 
                        className={classes.button}
                        variant="contained" color="primary"
                        onClick={addRandomColor}
                        disabled={paletteIsFull}>
                            Random Color
                    </Button>
                </div>
                <ColorPickerForm 
                    paletteIsFull={paletteIsFull}
                    addNewColor = {addNewColor}
                    colors={colors}
                />
                </div>
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
                    onSortEnd={onSortEnd}
                    distance={10}
                    >

                    </DraggableColorList>
             
            </main>
    </div>
  );
}