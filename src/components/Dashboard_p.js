import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';

class Dashboard_p extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log('Started');
    }
    addTreatment = () => {
        this.props.history.push('/add-drug');
    };
    render() {return (
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
    );}
}
 
export default Dashboard_p;