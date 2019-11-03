// import React from 'react';
import React, { useState,useEffect } from 'react'
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function ColorPickerForm(props){
    const {paletteIsFull,addNewColor,colors} = props;
    const [curColor, setCurColor] = useState("teal");
    const [newName, setNewName] = useState('');

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        })
    }, [colors]);

    //dont forget the curColor needs to be in the array that useEffect looks for changes
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return colors.every(
                ({ color }) => color !== curColor
            )
        })
    }, [colors, curColor]);



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