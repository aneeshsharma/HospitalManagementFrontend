import React from 'react';
import axios from 'axios';

import { Container, TextField, Grid, Button } from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

class AddPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                contact: '',
                age: '',
                name: '',
            },
        };
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/patient`;

        axios
            .post(url, this.state.formData)
            .then((response) => {
                console.log(response.data);
                this.props.history.push('/treatment');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleTextInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value,
            },
        });
    };

    handleNumberInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'contact' && value.length > 10) return;

        if (typeof value !== 'string') return;

        if (value.length > 0)
            for (var x of value) if (x > '9' || x < '0') return;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value,
            },
        });
    };

    render() {
        return (
            <Container style={{ height: '100vh' }}>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    <Grid item>
                        <h1>Add New Patient Record</h1>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Patient Name"
                            value={this.state.formData.name}
                            name="name"
                            onChange={this.handleTextInput}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Age"
                            value={this.state.formData.age}
                            name="age"
                            onChange={this.handleNumberInput}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Contact Number"
                            value={this.state.formData.contact}
                            name="contact"
                            onChange={this.handleNumberInput}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default AddPatient;
