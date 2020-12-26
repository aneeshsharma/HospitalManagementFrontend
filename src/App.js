import React from 'react';
import { BrowserRouter, Switch, Route,  } from 'react-router-dom';
import { Avatar, Container, Grid } from '@material-ui/core';
 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import Home from './Home';
 
function App() {
  const NavRoutes = () => {
    return (
      <div>
        <Container maxWidth = "100%">
          <Grid container direction="row" justify="center" spacing={2} alignItems="center" style={{height: 100}}> 
            <Grid item>
              <Avatar src="/static/images/avatar/avatar.png" />
            </Grid>
            <Grid item>
              <h1> Name Placeholder </h1>
            </Grid>
          </Grid>
        </Container>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route component={NavRoutes} />
              {/* <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;