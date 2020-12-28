import React from 'react';
import axios from 'axios';

import { Container, Grid, Button, Select, MenuItem } from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

class Prescription extends React.Component {
    constructor(props) {
        super(props);
        const { id, treat_id } = props.match.params;
        console.log('Patient id ', id);
        console.log('Treat id ', treat_id);
        this.state = {
            formData: {
                patient_id: id || '',
                treat_id: treat_id || '',
                doctor_id: localStorage.getItem('doctor_id', null),
            },
            drugList: [],
            patients: [],
            selectedDrug: '',
        };
        console.log('Started');
    }

    componentDidMount() {
        this.getDrugList();
        this.getPatientList();
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/prescription`;

        var data = {
            ...this.state.formData,
        };
        console.log(data);

        axios
            .post(url, data)
            .then((response) => {
                console.log(response.data);
                this.props.history.push('/dashboard');
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

    getDrugList = () => {
        let items = [];

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/common/drugs`;
        console.log(url);

        axios
            .get(url)
            .then((response) => {
                console.log(response.data);

                const result = response.data;
                result.forEach((r) => {
                    items.push({
                        id: r.drug_id,
                        value: `${r.drug_name} | Class ${r.class}`,
                    });
                });

                this.setState({
                    drugList: items,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

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

    handleDrugInput = (e) => {
        console.log(e.target.value);
        this.setState({
            selectedDrug: e.target.value,
        });
    };

    handleDrugAdd = () => {
        const value = this.state.selectedDrug;

        var list = this.state.formData.drugs;
        if (!list) list = [];
        list.push(value);
        this.setState({
            formData: {
                ...this.state.formData,
                drugs: list,
            },
            selectedDrug: '',
        });
    };

    renderDrugInput = () => {
        var menuItems = this.state.drugList.map((item) => {
            return <MenuItem value={item.id}>{item.value}</MenuItem>;
        });
        return (
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
                style={{ height: '100%' }}
            >
                <Grid item xs={3}>
                    <Select
                        value={this.state.selectedDrug}
                        fullWidth
                        onChange={this.handleDrugInput}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            --- Select Drugs ---
                        </MenuItem>
                        {menuItems}
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleDrugAdd}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        );
    };

    renderDrugList = () => {
        var drugs = this.state.formData.drugs;
        if (!drugs) drugs = [];
        var list = drugs.map((id) => {
            var item = this.state.drugList.filter((t) => t.id === id)[0];
            return <Grid item>{item.value}</Grid>;
        });
        return list;
    };

    renderPatientMenu = () => {
        var patients = this.state.patients;
        if (!patients) patients = [];

        var menuItems = patients.map((p) => {
            return (
                <MenuItem value={p.id}>
                    {p.id} | {p.name}
                </MenuItem>
            );
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
        let renderDrugInput = this.renderDrugInput();

        let renderDrugList = this.renderDrugList();
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
                        <h1>Prescription</h1>
                    </Grid>
                    {renderPatientMenu}
                    <h3>Drugs</h3>
                    {renderDrugList}
                    <Grid item>{renderDrugInput}</Grid>
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
export default Prescription;
