import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { menu } from 'components/shared/menu'

import Logo from 'components/shared/logo'

import UserNavigation from './user-navigation';

const DesktopBar = () => {
  const classes = useStyles();

  return (
    <>
      <Logo />
      <div>
        {menu.map(({ label, href }) => (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: classes.navigation,
            }}
          >
            {label}
          </Button>
        ))}
        <span className={classes.userNavigation}>
          <UserNavigation />
        </span>
      </div>
    </>
  );
};
export default DesktopBar

const useStyles = makeStyles(() => ({
  userNavigation: {
    marginLeft: '50px'
  }
}))