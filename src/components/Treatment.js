import React from 'react';
import axios from 'axios';

import {
    Container,
    TextField,
    Grid,
    Button,
    MenuItem,
    Select,
} from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

class Treatment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                patientId: '',
                report: '',
            },
            patients: [],
        };
    }

    componentDidMount() {
        this.getPatientList();
    }

    getPatientList = () => {
        /* TODO: Fetch patient list from backend */
        let patients = [];

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/patient`;
        console.log(url);

        axios
            .get(url)
            .then((response) => {
                console.log(response.data);

                const result = response.data;
                result.forEach((r) => {
                    patients.push({
                        id: r.patient_id,
                        name: r.name,
                    });
                });

                this.setState({
                    patients: patients,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);

        /* TODO: Submit treatment data to backend */

        this.props.history.push(
            `/prescription/${this.state.formData.patientId}`
        );
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

    renderPatientMenu = () => {
        var patients = this.state.patients;
        if (!patients) patients = [];

        var menuItems = patients.map((p) => {
            return <MenuItem value={p.id}>{p.name}</MenuItem>;
        });

        return (
            <Grid item>
                <Select
                    value={this.state.formData.patientId}
                    fullWidth
                    onChange={this.handleTextInput}
                    name="patientId"
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        --- Select Patient ---
                    </MenuItem>
                    {menuItems}
                </Select>
            </Grid>
        );
    };

    render() {
        let renderPatientMenu = this.renderPatientMenu();
        return (
            <Container style={{ height: '100vh' }}>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    <Grid item>
                        <h1>Treatment</h1>
                    </Grid>

                    {renderPatientMenu}

                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Report"
                            value={this.state.formData.report}
                            name="report"
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
export default Treatment;
