
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";


const UserNavigation = () => {

    const classes = useStyles();

    return (
        <span className={classes.userNavigation}>
            <IconButton
                {...{
                color: 'inherit',
                to: '/login',
                component: Link,
            }}>
                <AccountCircleIcon />
            </IconButton>

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