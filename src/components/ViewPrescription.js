import React from 'react';
import axios from 'axios';

import {
    Container,
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

var drugs = [
    ['yellow', '22/11/10'],
    ['2', '22/11/10'],
    ['3', '22/11/11'],
    ['4', '22/11/12'],
];
class ViewPrescription extends React.Component {
    constructor(props) {
        super(props);
        const { treat_id } = props.match.params;
        this.state = {
            treat_id: treat_id,
            drugList: [],
        };
    }

    componentDidMount() {
        this.getDrugList();
        this.getPrescription();
    }

    getDrugList = () => {
        let items = [];

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/common/drugs`;

        axios
            .get(url)
            .then((response) => {
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

    getPatientDetails = (patient_id) => {
        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/patient?patient_id=${patient_id}`;
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    patientDetails: response.data[0],
                });
                console.log(this.state.patientDetails);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getPrescription = () => {
        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/prescription?treat_id=${this.state.treat_id}`;
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    prescription: response.data,
                });
                this.getPatientDetails(response.data[0].patient_id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    renderDrugDetails = () => {
        var prescription = this.state.prescription;
        if (!prescription) prescription = [];
        var result = prescription.map((entry) => {
            var drug = this.state.drugList.filter(
                (d) => d.id == entry.drug_id
            )[0];
            if (!drug) return null;
            return (
                <Grid item>
                    <Card>
                        <CardContent>
                            <p>{entry.drug_id}</p>
                            <p>{drug.value}</p>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
        return result;
    };

    render() {
        if (!this.state.patientDetails) return 'loading';
        return (
            <Container style={{ marginTop: '70px' }}>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    <Grid container direction="row" spacing={3}>
                        <Grid item xs>
                            <b>Name:</b> {this.state.patientDetails.name}
                        </Grid>
                        <Grid item xs>
                            <b>Age:</b> {this.state.patientDetails.age}
                        </Grid>
                        <Grid item xs>
                            <b>Contact:</b> {this.state.patientDetails.contact}
                        </Grid>
                    </Grid>
                    {this.renderDrugDetails()}
                </Grid>
            </Container>
        );
    }
}
export default ViewPrescription;
