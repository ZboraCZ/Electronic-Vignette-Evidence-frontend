import { Suspense } from "react";
import { Switch } from "react-router-dom";
import Loader from 'components/shared/loader';
import { lazyImport, PublicRoute, PrivateRoute } from 'utils/routing';
import { privateRoutes, publicRoutes } from './route-list';


const AppRouter = () => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {publicRoutes.map(({ route, component, restricted }, i) => (
                <PublicRoute restricted={!!restricted} component={lazyImport(component)} path={`/${route}`} exact key={i} /> 
            ))}

            {privateRoutes.map(({ route, component }, i) => (
                <PrivateRoute component={lazyImport(component)} path={`/${route}`} exact key={i} /> 
            ))}

            <PublicRoute restricted={false} component={lazyImport('not-found')} path={'*'} exact />
        </Switch>
    </Suspense>
)

export default AppRouter;