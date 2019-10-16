import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';

function App() {
  console.log(generatePalette(seedColors[4]));
  return (
    <Switch>
      <Route exact path="/" render={()=> <h1>Palette goes here</h1>} />
  <Route exact path="/palette/:id" render={() => <h1>individual palette goes here</h1> }/>
    </Switch>
   
    
    // <div >
    //     <Palette palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}

export default App;
