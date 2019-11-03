import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



export default function PaletteMetaForm(props) {
    const { handleSubmit } = props;
    const [open, setOpen] = useState(false);
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create A new Palette
          </DialogContentText>

                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            onChange={handleChangePalette}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["this field is required", "Name already exists"]} />
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >Save Palette</Button>
                    </ValidatorForm>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                   
                </DialogActions>
            </Dialog>
        </div>
    );
}