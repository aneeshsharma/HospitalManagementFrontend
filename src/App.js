import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Prescription from './components/Prescription';
// import Home from './Home';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route
                                path="/prescription"
                                component={Prescription}
                            />
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
