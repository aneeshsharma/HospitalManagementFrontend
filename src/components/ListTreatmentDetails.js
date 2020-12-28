import React from 'react';

import axios from 'axios';

import {
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core';

import BACKEND_ENDPOINT from '../endpoint';

var treatmentData = [
    ['1', '22/11/10'],
    ['2', '22/11/10'],
    ['3', '22/11/11'],
    ['4', '22/11/12'],
];
class ListTreatmentDetails extends React.Component {
    constructor(props) {
        super(props);
        const { patient_id } = props.match.params;
        this.state = {
            treat_id: 0,
            treatments: [],
            patient_id: patient_id,
        };
    }

    componentDidMount() {
        this.getTreatments();
    }

    getTreatments = () => {
        const url = `${BACKEND_ENDPOINT}/api/v1/resources/doctor/treatment?patient_id=${this.state.patient_id}`;
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    treatments: response.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    viewPrescription = (treat_id) => {
        treat_id = treat_id;
        this.props.history.push(`/view-prescription/${treat_id}`);
    };
    renderTreatmentDetails = () => {
        var result = this.state.treatments.map((treatmentDetails) => (
            <Grid item>
                <Card>
                    <CardContent>
                        <p>
                            {treatmentDetails.treatment_date}
                            <br />
                            {treatmentDetails.treatment_report}
                            <br />
                            <br />
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        this.viewPrescription(
                                            treatmentDetails.treat_id
                                        )
                                    }
                                >
                                    View Prescription
                                </Button>
                            </CardActions>
                        </p>
                    </CardContent>
                </Card>
            </Grid>
        ));
        return result;
    };
    render() {
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    {this.renderTreatmentDetails(this.treatmentData)}
                </Grid>
            </Container>
        );
    }
}
export default ListTreatmentDetails;
