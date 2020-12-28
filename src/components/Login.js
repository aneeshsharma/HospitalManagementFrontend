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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                category: '',
                name: '',
            },
        };
        console.log('Started');
        console.log(BACKEND_ENDPOINT);
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/${this.state.formData.category}/login?name=${this.state.formData.name}`;
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem(
                    'user-category',
                    this.state.formData.category
                );
                if (this.state.formData.category === 'doctor')
                    localStorage.setItem('doctor_id', response.data.doctor_id);
                else if (this.state.formData.category === 'pharmacy')
                    localStorage.setItem(
                        'pharmacy_id',
                        response.data.pharmacy_id
                    );

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

    handleSignup = (e) => {
        this.props.history.push('/sign-up');
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
                        <h1>Hospital Management System</h1>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Name"
                            onChange={this.handleTextInput}
                            name="name"
                            value={this.state.formData.name}
                        />
                    </Grid>
                    <Grid item>
                        <Select
                            value={this.state.formData.category}
                            fullWidth
                            onChange={this.handleTextInput}
                            name="category"
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                --- Select Category ---
                            </MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="pharmacy">Pharmacy</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignup}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default Login;
