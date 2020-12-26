import React from 'react';
import { Container, Grid } from '@material-ui/core';

function Dashboard() {
  return (
    <Container maxWidth="100%">
        <Grid container direction="column" alignItems="center" >
            <Grid container direction="row" justify="center" spacing={2} alignItems="center" style={{ width: "100%" }}>
                <Grid item>
                    <h1>Hello</h1>
                </Grid>
                <Grid item>
                    <h2> HI</h2>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" style={{ width: "100$" }}>
                <Grid item>
                    <h1>Hey</h1>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  );
}
 
export default Dashboard;