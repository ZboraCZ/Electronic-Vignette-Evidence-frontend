import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import { keyframes } from 'styled-components';
import styles from './loader.module.css';
import FormControl from '@material-ui/core/FormControl';
import { patchUserVignetteEdit } from 'api/vignettes';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    formField: {
        width: '20%',
        marginRight: 10,
        lineHeight: 2.6
    },
    
}));


export const UserVignetteForm = ({ user, vignette }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)

    const [modifiedVignette, setModifiedVignette] = useState(vignette)
    if(modifiedVignette.id_vignette_type == null){
        modifiedVignette.id_vignette_type = vignette.vignetteType.id
    }
    const displayHooks = () => {
        console.log(modifiedVignette)
        console.log(user)
    }


    const handleChange = (event) => {
        let modifiedName = event.target.name 
        setModifiedVignette({...modifiedVignette, [modifiedName]: event.target.value})
      };

    
    const SubmitVignetteEdit = (event) => {
        event.preventDefault();
        setLoading(true)
        delete modifiedVignette.vignetteType
        modifiedVignette.userId = user.id

        // TODO: axios patch route for modifiedVignette 
        patchUserVignetteEdit(user.id, modifiedVignette)
            .then((response) => {
                setModifiedVignette(response.data)
                setLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setLoading(false)
            })
    }

    return (
        <div style={{ width: '107%', marginTop: '25px' }}>
            <form  onSubmit={SubmitVignetteEdit} className={classes.vignetteForm} noValidate autoComplete="off">
                <input type="hidden" id="vignetteId" name="vignetteId" value={modifiedVignette.vignetteId} />
                <TextField className={classes.formField} name="licensePlate" onChange={handleChange} label="SPZ" variant="outlined" value={modifiedVignette.licensePlate} />                
                <FormControl variant="outlined" className={classes.formField}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="id_vignette_type"
                        value={modifiedVignette.id_vignette_type}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>10ti denní</MenuItem>
                        <MenuItem value={2}>20ti denní</MenuItem>
                        <MenuItem value={3}>30ti denní</MenuItem>
                    </Select>
                </FormControl>
                
                
                
                
                <TextField className={classes.formField} name="validFrom" onChange={handleChange} label="Validní od" variant="outlined" value={modifiedVignette.validFrom} />
                <Button
                    variant="contained"
                    disabled={loading}
                    color="primary"
                    size="large"
                    className={classes.formField}
                    startIcon={<SaveIcon />}
                    type="submit"
                >
                    Save
                    </Button>

                    <div className={styles.loader} style={{display:(loading) ? "inline" : "none"}}></div>
            </form>

        </div>
    )
}