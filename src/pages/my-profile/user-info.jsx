import { Typography, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const UserInfo = ({ user, setUser, isEditing }) => {
    
    const classes = useStyles();

    const handleChange = (e) => {
        setUser(prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Grid container>
            <Grid item xs={3} >
                <Typography variant='button' className={classes.label}>  
                    Jméno
                </Typography>
            </Grid>

            <Grid item xs={9}>
                {!isEditing ? (
                    <Typography variant='body1' >
                        {user.first_name}
                    </Typography>
                ) : (
                    <TextField name='first_name' label="Jméno" variant="outlined" value={user.first_name} onChange={handleChange} className={classes.input} />
                )}
            </Grid>

            <Grid item xs={3}>
                <Typography variant='button' className={classes.label}>
                    Příjmení
                </Typography>
            </Grid>

            <Grid item xs={9}>
                {!isEditing ? (
                    <Typography variant='body1'>
                        {user.last_name}
                    </Typography>
                ) : (
                    <TextField name='last_name' label="Příjmení" variant="outlined" defaultValue={user.last_name} className={classes.input}/>
                )}
            </Grid>

            <Grid item xs={3}>  
              <Typography variant='button' className={classes.label}>
                    Email
                </Typography>
            </Grid>

            <Grid item xs={9}>
                {!isEditing ? (
                    <Typography variant='body1'>
                        {user.email}
                    </Typography>
                ) : (
                    <TextField name='email' label='Email' variant="outlined" defaultValue={user.email} className={classes.input} />
                )}    
            </Grid>

            <Grid item xs={3}>
                <Typography variant='button' className={classes.label}>
                    Telefonní číslo
                </Typography>
            </Grid>

            <Grid item xs={9}>
                {!isEditing ? (
                    <Typography variant='body1'>
                        {user.phone}
                    </Typography>
                ) : (
                    <TextField name='phone' label="Telefonní číslo" variant="outlined" defaultValue={user.phone} className={classes.input} />
                )} 
            </Grid>
        </Grid>
    )
}
export default UserInfo;

const useStyles = makeStyles((theme) => ({
    input: { 
        paddingBottom: '25px',
        width: '100%'
    }
}));