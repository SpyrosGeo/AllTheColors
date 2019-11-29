import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component{
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    render(){
        const {deletePalette, palettes ,classes} = this.props;
        return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                        <h1>All The Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                </nav>
                
                        <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition
                            key={palette.id}
                            classNames="fade"
                            timeout={500}
                            >

                            <MiniPalette 
                            key={palette.id}
                            id ={palette.id}
                            handleDelete = {deletePalette}
                            {...palette} 
                            handleClick={()=>this.goToPalette(palette.id)}/>
                            </CSSTransition>
                            ))}
                </TransitionGroup>
                </div>
        </div>
        );
    }
   
}

export default withStyles(styles)(PaletteList);