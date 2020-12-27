import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';

class Dashboard_d extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log('Started');
    }
    addTreatment = () => {
        this.props.history.push('/treatment');
    };
    addPatient = () => {
        this.props.history.push('/add-patient');
    };
    render() {return (
        <Container maxWidth="100%" style={{ height: '100vh' }}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        alignItems="center"
                        style={{ height: '100%' }}
                    >
                        <Grid Item>
                            <h1>Hospital Management System</h1>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addPatient}
                            >
                                Add Patient
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addTreatment}
                            >
                                Add Treatment
                            </Button>
                        </Grid>                    
                    </Grid>
                </Container>
    );}
}
 
export default Dashboard_d;