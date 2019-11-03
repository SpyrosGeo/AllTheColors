import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



export default function PaletteMetaForm(props) {
    const { handleSubmit,hideForm } = props;
    const [open, setOpen] = useState(true);
    const [newPaletteName, setPaletteName] = useState('');

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        })
    }, [props.palettes]);

    const handleChangePalette = (e) => {
        setPaletteName(e.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        
        
            <Dialog
                 open={open} 
                 onClose={hideForm} 
                 aria-labelledby="form-dialog-title"
                 
                 >
                <DialogTitle id="form-dialog-title">Create a Palette</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new palette. Make sure its unique!
          </DialogContentText>

                    
                        <TextValidator
                             fullWidth   
                            label="Palette Name"
                            value={newPaletteName}
                            onChange={handleChangePalette}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["this field is required", "Name already exists"]} />
                      
                    
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
          </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >Save Palette</Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>

    );
}