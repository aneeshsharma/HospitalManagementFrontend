import React from 'react';
import axios from 'axios';

import { Container, TextField, Grid, Button } from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

class AddDrug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                drug_name: '',
                class: '',
            },
        };
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/common/drugs`;

        axios
            .post(url, this.state.formData)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    formData: {
                        drug_name: '',
                        class: '',
                    },
                });
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
                        <h1>Add New Drug</h1>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Drug Name"
                            value={this.state.formData.drug_name}
                            name="drug_name"
                            onChange={this.handleTextInput}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Class"
                            value={this.state.formData.class}
                            name="class"
                            onChange={this.handleTextInput}
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
export default AddDrug;
