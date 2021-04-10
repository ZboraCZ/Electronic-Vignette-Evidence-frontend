
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { getIsAuth } from 'store/auth';

const UserNavigation = () => {

    const classes = useStyles();
    const isAuth = useSelector(getIsAuth)

    return (
        <div className={classes.userNavigation}>
            {isAuth && (
                <IconButton
                    {...{
                    color: 'inherit',
                    to: '/profil/informace',
                    component: Link,
                }}>
                    <AccountCircleIcon />
                </IconButton>
            )}
        </div>
    )
}
export default UserNavigation;


const useStyles = makeStyles(() => ({
    userNavigation: {
        marginLeft: '10px',
        display: 'flex'
    }
}));