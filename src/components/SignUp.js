import React from 'react';
import {
    Container,
    TextField,
    Grid,
    Button,
    MenuItem,
    Select,
} from '@material-ui/core';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                category: '',
                name: '',
                department: '',
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
        let departments = [
            { id: 0, name: 'Department 0' },
            { id: 1, name: 'Department 1' },
            { id: 2, name: 'Department 2' },
        ];

        this.setState({
            departments: departments,
        });
    };

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
                    value={this.state.formData.department}
                    fullWidth
                    onChange={this.handleTextInput}
                    name="department"
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
