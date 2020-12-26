import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

function Login() {
  return (
    <Container maxWidth="100%" style={{height:"100vh"}}>
        <Grid container direction="column" justify="center" spacing={2} alignItems="center" style={{height:"100%"}}>
            <Grid Item> 
              <h1>Hospital Management System</h1>
            </Grid>
            <Grid item>
            <TextField id="filled-basic" label="Name" />
            </Grid>
            <Grid item >
            <TextField id="filled-basic" label="Password" type="password" />
            </Grid>
            <Grid item >
            <Router>
              <Button variant="contained" color="primary" component={RouterLink} to="/dashboard">
                  Login
              </Button>
            </Router>
            </Grid>
        </Grid>
    </Container>
  );
}
 
export default Login;