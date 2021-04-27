import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

const columns = [
    { field: 'licensePlate', headerName: 'SPZ', width: 130 },
    { field: 'vignetteType', headerName: 'Typ', width: 130 },
    { field: 'validFrom', headerName: 'Validní od', width: 130 },
    { field: 'editButton', headerName: 'Upravit', width: 130 },
];

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    formField:{
        width: '23%',
        marginRight: 10,
        lineHeight: 2.6
    }
  }));

  const SubmitVignetteEdit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.listOrder.value)
    console.log(event.target.elements.vignetteId.value)
  }

export const VignettesTable = ({ vignettesArr }) => {
    const classes = useStyles();

    let rows = []

    vignettesArr.map((v, i) => (
        rows.push({
            id: i, 
            licensePlate: v.licensePlate, 
            vignetteType: v.vignetteType.display_name, 
            validFrom: v.validFrom, 
        })
    ))

    return(
        <div style={{width: '107%', marginTop: '25px' }}>
            {rows.map((vignette, i) => (
                <form key={i} onSubmit={SubmitVignetteEdit} className={classes.vignetteForm} noValidate autoComplete="off">
                    <input type="hidden" id="listOrder" name="listOrder" value={i} />
                    <input type="hidden" id="vignetteId" name="vignetteId" value={vignette.id} />
                    <TextField className={classes.formField} label="SPZ" variant="outlined" value={vignette.licensePlate}/>
                    <TextField className={classes.formField} label="Typ" variant="outlined" value={vignette.vignetteType} />
                    <TextField className={classes.formField} label="Validní od" variant="outlined" value={vignette.validFrom} />
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