import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: localStorage.getItem('user-category'),
        };
    }

    addTreatment = () => {
        this.props.history.push('/treatment');
    };

    addPatient = () => {
        this.props.history.push('/add-patient');
    };

    addDrug = () => {
        this.props.history.push('/add-drug');
    };

    renderPharmacy() {
        return (
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
                            onClick={this.addTreatment}
                        >
                            Add Drug
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    renderDoctor() {
        return (
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
        );
    }

    render() {
        if (this.state.category == 'doctor') {
            return this.renderDoctor();
        } else if (this.state.category == 'pharmacy') {
            return this.renderPharmacy();
        } else {
            return (
                <Container maxWidth="100%" style={{ height: '100vh' }}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        alignItems="center"
                        style={{ height: '100%' }}
                    >
                        Category Not Recognized
                    </Grid>
                </Container>
            );
        }
    }
}

export default Dashboard;
