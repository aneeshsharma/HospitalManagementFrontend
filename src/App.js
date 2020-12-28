import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Avatar, Grid } from '@material-ui/core';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Prescription from './components/Prescription';
import AddPatient from './components/AddPatient';
import SignUp from './components/SignUp';
import Treatment from './components/Treatment';
import AddDrug from './components/AddDrug';
import ListTreatmentDetails from './components/ListTreatmentDetails';
import ViewPrescription from './components/ViewPrescription';

import SelectPatient from './components/SelectPatient';
// import Home from './Home';

function App() {
    const NavRoutes = () => {
        var category = localStorage.getItem('user-category');
        console.log(category);
        var id = '';
        if (category === 'doctor') id = localStorage.getItem('doctor_id');
        else if (category === 'pharmacy')
            id = localStorage.getItem('pharmacy_id');
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
                            <h1> {id} </h1>
                        </Grid>
                    </Grid>
                </div>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route
                        path="/prescription/:id/:treat_id"
                        component={Prescription}
                    />
                    <Route path="/add-patient" component={AddPatient} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/treatment" component={Treatment} />
                    <Route path="/add-drug" component={AddDrug} />
                    <Route
                        path="/view-prescription/:treat_id"
                        component={ViewPrescription}
                    />
                    <Route path="/select-patient" component={SelectPatient} />
                    <Route
                        path="/patient/treatment-details/:patient_id"
                        component={ListTreatmentDetails}
                    />
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
