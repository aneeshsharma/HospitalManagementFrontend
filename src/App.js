import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Avatar, Grid } from '@material-ui/core';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Prescription from './components/Prescription';
// import Home from './Home';

function App() {
    const NavRoutes = () => {
        return (
            <div>
                <div style={{ width: '100%', margin: '0', padding: '0' }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        spacing={2}
                        alignItems="center"
                        style={{
                            height: 100,
                            background: '#ddd',
                            width: '100%',
                            margin: 0,
                        }}
                    >
                        <Grid item>
                            <Avatar src="/static/images/avatar/avatar.png" />
                        </Grid>
                        <Grid item>
                            <h1> Name Placeholder </h1>
                        </Grid>
                    </Grid>
                </div>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/prescription" component={Prescription} />
                </Switch>
            </div>
        );
    };
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route component={NavRoutes} />
                    {/* <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
