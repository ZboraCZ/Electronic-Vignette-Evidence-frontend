import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { getUser, fetchLicencePlates, fetchVignetteByLicencePlate } from 'api/vignettes';
import { UserVignetteForm } from 'components/vignette/user-vignette-form';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const ManageUsers = () => {

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4)
    },
    button: {
      lineHeight: 2.6
    },
    formField: {
        marginRight: 20,
    },
  }))

  const classes = useStyles();
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState(null)
  const [licensePlates, setLicensePlates] = useState(null)
  const [vignettes, setVignettes] = useState(null)
  const [userMail, setUserMail] = useState("")

  useEffect(() => {
    if(user !== null) {
      getUserLicensePlates()
    }
  }, [user])
 
  const handleUserMailChange = (event) => {
    setUserMail(event.target.value)
  };

  const findUser = (event) => {
    event.preventDefault();
    setLoading(true)
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(userMail) ) {
        getUser(userMail)
        .then((responseUser) => {
          setUser(responseUser.data)
          setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        
      })
    }
    else {
        console.log("Wrong mail format")
        setLoading(false)
    }
  }

  const getUserLicensePlates = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(
        fetchLicencePlates(user.id)).then(({ meta, payload }) => {
          if(meta.requestStatus === 'fulfilled') {
            let platesArr = []
            payload.map((lObj,i) => {
                platesArr[i] = lObj.license_plate
            })
            setLicensePlates(platesArr)
          }
          
        })
    }, 1500);
    setLoading(false)
  }

  return (
    <Paper className={classes.root}>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography>
            Hledat uživatele
          </Typography>
        </Grid>

        <Grid item>
          <form onSubmit={findUser} className={classes.userForm} noValidate autoComplete="off">
            <TextField className={classes.formField} name="email" onChange={handleUserMailChange} label="email" variant="outlined" value={userMail} />                
            <Button
                    variant="contained"
                    disabled={loading}
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SearchIcon />}
                    type="submit"
                >
                    Hledat
                    </Button>
          </form>
        </Grid>
      </Grid>
      <br/><br/>

      {user && (
        <>
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>

          <Typography>
            {user.email}
          </Typography>

          <Typography>
            {user.phone}
          </Typography>

          <Typography>
            {user.role.name}
          </Typography>

          <Typography>
            Zakoupené známky:
          </Typography>

          
        </>
      )}
      <div>
            {
                (licensePlates !== null) &&
                  DisplayLicensePlates(user, licensePlates)
            }
          </div>

    </Paper>
  )
}

export default ManageUsers

export const DisplayLicensePlates = (user, licensePlates) => {
    
      return licensePlates.map((plate, i) => (
          <div key={i}>
              <DisplayUserVignettes user={user} plate={plate} />
          </div>
      ))
}

const DisplayUserVignettes = ({user, plate}) => {

  const [vignettes, setVignettes] = useState(null)

  useEffect(() => {
    if(plate !== null) {
      getVignettes(plate)
    }
  }, [plate])

    const getVignettes = (plate) => {
      fetchVignetteByLicencePlate(plate).then((responseVignettes) => {
        setVignettes(responseVignettes.data)
      })
    }


  if (vignettes != null) {
    return vignettes.map((vignette) => <UserVignetteForm key={vignette.id} user={user} vignette={vignette}/>)
  } 
  else {
    return (
      <div></div>
    )
  }
  
}


const mockUsers = [
  {
    "id": 1,
    "email": "admin@znamky.com",
    "first_name": "FS_Adminss",
    "last_name": "LS_Admin",
    "phone": "666666666",
    "role": {
      "id": 1,
      "name": "admin"
    }
  },
  {
    "id": 2,
    "email": "user@znamky.com",
    "first_name": "Milan",
    "last_name": "Chrápal",
    "phone": "777777777",
    "role": {
      "id": 2,
      "name": "user"
    }
  }
]