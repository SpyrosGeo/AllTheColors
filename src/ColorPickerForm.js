// import React from 'react';
import React, { useState } from 'react'
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function ColorPickerForm(props){
    const {paletteIsFull,addNewColor} = props;
    const [curColor, setCurColor] = useState("teal");
    const [newName, setNewName] = useState('');





    const updateCurColor = (newColor) => {
        setCurColor(newColor.hex);

    }
    const handleChange = (e) => {
        setNewName(e.target.value)

    }
    const handleSumbit = () => {
        const newColor= {
            color:curColor,
            name:newName
        }
        addNewColor(newColor)
    }

    


    return (
        <div>
            <ChromePicker
                color={curColor}
                onChangeComplete={updateCurColor} />
            <ValidatorForm onSubmit={handleSumbit}>
                <TextValidator
                    value={newName}
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['this field is required', 'name needs to be unique', 'color needs to be unique']} />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={paletteIsFull}
                    style={{ backgroundColor: paletteIsFull ? "grey" : curColor }}>
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    )

}
export default ColorPickerForm;