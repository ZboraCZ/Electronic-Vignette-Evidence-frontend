import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { lazy } from 'react';
import { getIsAuth, isNewlyRegistered } from 'store/auth'

export const lazyImport = (component) => lazy(() => import(`pages/${component}`));

export const PrivateRoute = ({component: Component, ...rest}) => {
    
    const isAuth = useSelector(getIsAuth);

    return (
        <Route {...rest} render={props => (
            isAuth ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const isAuth =  useSelector(getIsAuth);
    
    return (
        <Route {...rest} render={props => (
            isAuth && restricted ?
                <Redirect to='/profil/zakoupene-znamky' />
            : <Component {...props} />
        )} />
    );
};