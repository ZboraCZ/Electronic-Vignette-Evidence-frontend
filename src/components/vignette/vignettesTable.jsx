import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    formField: {
        width: '23%',
        marginRight: 10,
        lineHeight: 2.6
    }
}));
/*
  const SubmitVignetteEdit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.listOrder.value)
    console.log(event.target.elements.vignetteId.value)
    console.log(event.target.elements.vignetteId.value)
  }
  */

export const VignettesTable = ({ user, vignettesArr }) => {
    console.log(vignettesArr)
    console.log(user)

    let rows = []

    const SubmitVignetteEdit = (event) => {
        event.preventDefault();
        let vignetteToEdit = vignettesArr[event.target.elements.listOrder.value]
        vignetteToEdit.licensePlate = event.target.elements.licensePlate.value
        vignetteToEdit.validFrom = event.target.elements.validFrom.value
        switch (event.target.elements.vignetteType.value) {
            case '10ti denní':
                vignetteToEdit.id_vignette_type = 1
                break;
            case '20ti denní':
                vignetteToEdit.id_vignette_type = 2
                break;
            case '30ti denní':
                vignetteToEdit.id_vignette_type = 3
                break;
            default:
                return null;
        }
        delete vignetteToEdit.vignetteType

        // TODO: axios patch route for vignette 
    }

    const classes = useStyles();

    vignettesArr.map((v, i) => (
        rows.push({
            id: i,
            licensePlate: v.licensePlate,
            vignetteType: v.vignetteType.display_name,
            validFrom: v.validFrom,
        })
    ))

    return (
        <div style={{ width: '107%', marginTop: '25px' }}>
            {rows.map((vignette, i) => (
                <form key={i} onSubmit={SubmitVignetteEdit} className={classes.vignetteForm} noValidate autoComplete="off">
                    <input type="hidden" id="listOrder" name="listOrder" value={i} />
                    <input type="hidden" id="vignetteId" name="vignetteId" value={vignette.id} />
                    <TextField className={classes.formField} name="licensePlate" label="SPZ" variant="outlined" value={vignette.licensePlate} />
                    <TextField className={classes.formField} name="vignetteType" label="Typ" variant="outlined" value={vignette.vignetteType} />
                    <TextField className={classes.formField} name="validFrom" label="Validní od" variant="outlined" value={vignette.validFrom} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.formField}
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                        Save
                    </Button>
                </form>
            ))
            }

        </div>
    )

}