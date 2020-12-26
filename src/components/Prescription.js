import React from 'react';
import Search from 'react-search';
import { Container, TextField, Grid, Button } from '@material-ui/core';

class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: null,
            drugList: [],
        };
        console.log('Started');
    }

    componentDidMount() {
        this.getDrugList();
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);
        this.props.history.push('/dashboard');
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
        let items = [
            { id: 0, value: 'purple pills' },
            { id: 1, value: 'yellow pills' },
            { id: 2, value: 'green pills' },
            { id: 3, value: 'blue pills' },
            { id: 4, value: 'red pills' },
        ];

        this.setState({
            drugList: items,
        });
    };

    handleDrugsList = (items) => {
        console.log(items);
    };

    render() {
        return (
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
                        <h1>Prescription</h1>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Patient Name"
                            onChange={this.handleTextInput}
                            name="patientName"
                        />
                    </Grid>

                    <Search
                        items={this.state.drugList}
                        placeholder="Pick drugs"
                        maxSelected={100}
                        multiple={true}
                        onItemsChanged={this.handleDrugsList.bind(this)}
                        style={{ border: '1px solid black' }}
                    />

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
