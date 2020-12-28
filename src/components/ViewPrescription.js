import React from 'react';

import { Container, Grid, Button, Card, CardContent, CardActions } from '@material-ui/core';

var drugs = [["yellow", "22/11/10"], ["2", "22/11/10"], ["3", "22/11/11"], ["4", "22/11/12"]];
class ViewPrescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentID: 0
        };
    }
    renderDrugDetails = () => {
        var result = drugs.map((drug) => (
        <Grid item>
            <Card>
                <CardContent>
                    <p>
                        {drug[1]}   {drug[0]}
                        <br />
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
                    {this.renderDrugDetails(this.treatmentData)}
                </Grid>
            </Container>
        );
    }
}
export default ViewPrescription;
