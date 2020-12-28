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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                category: '',
                name: '',
                department_no: '',
                contact: '',
                position: '',
                address: '',
            },
        };
    }

    componentDidMount() {
        this.getDepartments();
    }

    getDepartments = () => {
        let departments = [];

        const url = `${BACKEND_ENDPOINT}/api/v1/resources/common/getDepartment`;
        console.log(url);

        axios
            .get(url)
            .then((response) => {
                console.log(response.data);

                const result = response.data;
                result.forEach((r) => {
                    departments.push({
                        id: r.department_no,
                        name: r.department_name,
                    });
                });

                this.setState({
                    departments: departments,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);
        const url = `${BACKEND_ENDPOINT}/api/v1/resources/${this.state.formData.category}/sign-up`;
        var data = {};
        for (var field in this.state.formData) {
            if (this.state.formData[field].length <= 0) data[field] = null;
            else data[field] = this.state.formData[field];
        }
        axios
            .post(url, data)
            .then((response) => {
                console.log(response.data);
                this.props.history.push('/');
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

    renderDepartments = () => {
        var dept = this.state.departments;
        if (!dept) dept = [];
        var menuItems = dept.map((d) => {
            return <MenuItem value={d.id}>{d.name}</MenuItem>;
        });

        return (
            <Grid item>
                <Select
                    value={this.state.formData.department_no}
                    fullWidth
                    onChange={this.handleTextInput}
                    name="department_no"
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        --- Select Department ---
                    </MenuItem>
                    {menuItems}
                </Select>
            </Grid>
        );
    };

    renderDoctorFields = () => {
        let renderDepartments = this.renderDepartments();
        return [
            <Grid item>
                <TextField
                    id="filled-basic"
                    label="Name"
                    onChange={this.handleTextInput}
                    name="name"
                    value={this.state.formData.name}
                />
            </Grid>,
            <Grid item>
                <TextField
                    id="filled-basic"
                    label="Position"
                    onChange={this.handleTextInput}
                    name="position"
                    value={this.state.formData.position}
                />
            </Grid>,
            <Grid item>
                <TextField
                    id="filled-basic"
                    label="Address"
                    onChange={this.handleTextInput}
                    name="address"
                    value={this.state.formData.address}
                />
            </Grid>,
            renderDepartments,
        ];
    };

    renderPharmacyFields = () => {
        let renderDepartments = this.renderDepartments();
        return [
            <Grid item>
                <TextField
                    id="filled-basic"
                    label="Name"
                    onChange={this.handleTextInput}
                    name="name"
                    value={this.state.formData.name}
                />
            </Grid>,
            <Grid item>
                <TextField
                    id="filled-basic"
                    label="Contact Number"
                    onChange={this.handleNumberInput}
                    name="contact"
                    value={this.state.formData.contact}
                />
            </Grid>,
            renderDepartments,
        ];
    };

    render() {
        let fields = null;
        if (this.state.formData.category === 'doctor') {
            fields = this.renderDoctorFields();
        } else if (this.state.formData.category === 'pharmacy') {
            fields = this.renderPharmacyFields();
        }
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
                    <Grid Item>
                        <h1>Sign Up</h1>
                    </Grid>

                    {fields}

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
                            SignUp
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default SignUp;
