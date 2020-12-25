import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';

function Login() {
  return (
    <Container maxWidth="100%" style={{height:"100vh"}}>
        <Grid container direction="column" justify="center" spacing={2} alignItems="center" style={{height:"100%"}}>
            <Grid item>
            <TextField id="filled-basic" label="Name" />
            </Grid>
            <Grid item >
            <TextField id="filled-basic" label="Password" type="password" />
            </Grid>
            <Grid item >
            <Button variant="contained" color="primary" >
                Login
            </Button>
            </Grid>
        </Grid>
    </Container>
  );
}
 
export default Login;