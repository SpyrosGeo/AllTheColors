import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import './NavBar.css';

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            format:"hex",
            open:false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(e){
        this.setState({
            format:e.target.value,
            open:true
        });
        this.props.handleChange(e.target.value)
    }

    closeSnackbar(){
        this.setState({
            open:false
        })
    }

    render(){
        const { level,changeLevel}= this.props;
        const { format,open  }= this.state;
        return(
            <header className="Navbar">
                <div className="logo">
                    <a href="#" alt="AllTheColors" >AllTheColors</a>
                </div>
                <div className="slider-container">
                    <span className="span-level">Level:{level}</span>
                    <div className="slider">
                        <Slider defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className="select-container">
                    <Select  value={format}onChange={this.handleFormatChange}>
                    <MenuItem value="hex">HEX- #ffffff</MenuItem> 
                    <MenuItem value="rgb">RGB -(255,255,255)</MenuItem> 
                    <MenuItem value="rgba">RGBA -(255,255,255,1.0)</MenuItem> 
                    </Select>
                </div>
                <Snackbar 
                anchorOrigin={{vertical:"bottom",horizontal:"left"}}
                 open={open} 
                 autoHideDuration={900}
                 message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                 ContentProps={{"aria-describedby":"message-id"}}
                 onClose={this.closeSnackbar}
                 action={[
                     <IconButton color="inherit" 
                     onClick={this.closeSnackbar}
                     key="close"
                     aria-label="close">
                     <CloseIcon />
                    </IconButton>]}/>
            </header>   
        )
    }


        
}
export default NavBar;