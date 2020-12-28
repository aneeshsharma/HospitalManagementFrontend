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
                patient_id: '',
                treatment_report: '',
                doctor_id: localStorage.getItem('doctor_id', null),
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

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/treatment`;

        axios
            .post(url, this.state.formData)
            .then((response) => {
                console.log(response.data);
                this.props.history.push(
                    `/prescription/${this.state.formData.patient_id}`
                );
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

    renderPatientMenu = () => {
        var patients = this.state.patients;
        if (!patients) patients = [];

        var menuItems = patients.map((p) => {
            return <MenuItem value={p.id}>{p.name}</MenuItem>;
        });

        return (
            <Grid item>
                <Select
                    value={this.state.formData.patient_id}
                    fullWidth
                    onChange={this.handleTextInput}
                    name="patient_id"
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
                            value={this.state.formData.treatment_report}
                            name="treatment_report"
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
