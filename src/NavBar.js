import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import './NavBar.css';

class NavBar extends Component{


    render(){
        const { level,changeLevel}= this.props;
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
               
            </header>   
        )
    }


        
}
export default NavBar;