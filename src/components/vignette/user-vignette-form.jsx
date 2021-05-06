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
        width: '22%',
        marginRight: 10,
        lineHeight: 2.6
    },
    
}));


export const UserVignetteForm = ( {user, vignette} ) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)

    const [modifiedVignette, setModifiedVignette] = useState(vignette)

    const handleChange = (event) => {
        let modifiedName = event.target.name 
        setModifiedVignette({...modifiedVignette, [modifiedName]: event.target.value})
      };

    
    const SubmitVignetteEdit = (event) => {
        event.preventDefault();
        setLoading(true)

        patchUserVignetteEdit(modifiedVignette)
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
                <TextField className={classes.formField} name="license_plate" onChange={handleChange} label="SPZ" variant="outlined" value={modifiedVignette.license_plate} />                
                <FormControl variant="outlined" className={classes.formField}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="vignette_type_id"
                        value={modifiedVignette.vignette_type_id}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>10ti denní</MenuItem>
                        <MenuItem value={2}>20ti denní</MenuItem>
                        <MenuItem value={3}>30ti denní</MenuItem>
                    </Select>
                </FormControl>
                
                
                
                
                <TextField className={classes.formField} name="valid_from" onChange={handleChange} label="Validní od" variant="outlined" value={modifiedVignette.valid_from} />
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