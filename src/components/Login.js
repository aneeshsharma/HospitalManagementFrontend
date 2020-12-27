import React from 'react';
import {
    Container,
    TextField,
    Grid,
    Button,
    MenuItem,
    Select,
} from '@material-ui/core';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                category: '',
            },
        };
        console.log('Started');
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
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Password"
                            type="password"
                            onChange={this.handleTextInput}
                            name="password"
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
                </Grid>
            </Container>
        );
    }
}
export default Login;
