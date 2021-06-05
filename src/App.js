import { Switch, Route } from 'react-router-dom';
import Login from './page/login/Login';
import User from './page/user/User';
import Map from './page/map/Map';
import BackToPage from './page/back-to-page/BackToPage';
function App() {
  return (
    <>
      <BackToPage />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/user'>
          <User />
        </Route>
        <Route exact path='/map/:lat/:lng/:name/:address'>
          <Map />
        </Route>
      </Switch>
    </>
  );
}
export default App;
