
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getIsAuth } from 'store/auth';
import { useSelector } from 'react-redux';

const UserNavigation = () => {

    const classes = useStyles();
    const isAuth = useSelector(getIsAuth)

    return (
        <span className={classes.userNavigation}>
            {isAuth && (
                <IconButton
                    {...{
                    color: 'inherit',
                    to: '/login',
                    component: Link,
                }}>
                    <AccountCircleIcon />
                </IconButton>
            )}

            <IconButton 
                {...{
                color: 'inherit',
                to: '/kosik',
                component: Link,
            }}>
                <ShoppingCartIcon />
            </IconButton>
        </span>
    )
}
export default UserNavigation;


const useStyles = makeStyles(() => ({
}));