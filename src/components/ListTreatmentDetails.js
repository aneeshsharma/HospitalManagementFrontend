import React from 'react';

import { Container, Grid, Button, Card, CardContent, CardActions } from '@material-ui/core';

var treatmentData = [["1", "22/11/10"], ["2", "22/11/10"], ["3", "22/11/11"], ["4", "22/11/12"]];
class ListTreatmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentID: 0
        };
    }
    viewPrescription = (treatmentID) => {
        treatmentID = treatmentID
        this.props.history.push('/patient/treatment-details/prescription')
    };
    renderTreatmentDetails = () => {
        var result = treatmentData.map((treatmentDetails) => (
        <Grid item>
            <Card>
                <CardContent>
                    <p>
                        {treatmentDetails[1]}
                        <br />
                        {treatmentDetails[0]}
                        <br />
                        <br />
                        <CardActions>
                            <Button 
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={()=>this.viewPrescription(treatmentData.indexOf(treatmentDetails))}
                            >View Prescription</Button>
                        </CardActions>
                    </p>
                </CardContent>
            </Card>
        </Grid>));
        return result;
    };
    render() {
        return (
            <Container >
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
