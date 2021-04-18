import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


function setToken(userToken) {
  // console.log('setToken: ', userToken);
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  // console.log('getToken : ', userToken);
  return userToken
}


const App = () => {

  const isAuthenticated = () => {
    // console.log('isAuth: ', getToken())
    if (getToken()) {
      return true;
    } else {
      return false;
    }
  }
  
  const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );


    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login setToken={setToken} {...props}/>} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <AuthenticatedRoute path="/" name="Home" component={TheLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
}

export default App;
