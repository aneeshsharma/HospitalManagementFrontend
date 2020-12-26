import React from 'react';

import {
    Container,
    TextField,
    Grid,
    Button,
    Select,
    MenuItem,
} from '@material-ui/core';

class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            drugList: [],
            selectedDrug: '',
        };
        console.log('Started');
    }

    componentDidMount() {
        this.getDrugList();
    }

    handleSubmit = () => {
        console.log('Submitting');
        console.log(this.state.formData);
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

    handleDrugInput = (e) => {
        console.log(e.target.value);
        this.setState({
            selectedDrug: e.target.value,
        });
    };

    handleDrugAdd = () => {
        const value = this.state.selectedDrug;

        var list = this.state.formData.drugs;
        if (!list) list = [];
        list.push(value);
        this.setState({
            formData: {
                ...this.formData,
                drugs: list,
            },
            selectedDrug: '',
        });
    };

    renderDrugInput = () => {
        var menuItems = this.state.drugList.map((item) => {
            return <MenuItem value={item.id}>{item.value}</MenuItem>;
        });
        return (
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
                style={{ height: '100%' }}
            >
                <Grid item xs={3}>
                    <Select
                        value={this.state.selectedDrug}
                        fullWidth
                        onChange={this.handleDrugInput}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            --- Select Drugs ---
                        </MenuItem>
                        {menuItems}
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleDrugAdd}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        );
    };

    renderDrugList = () => {
        var drugs = this.state.formData.drugs;
        if (!drugs) drugs = [];
        var list = drugs.map((id) => {
            var item = this.state.drugList.filter((t) => t.id === id)[0];
            return <Grid item>{item.value}</Grid>;
        });
        return list;
    };

    render() {
        let renderDrugInput = this.renderDrugInput();

        let renderDrugList = this.renderDrugList();
        return (
            <Container style={{ height: '100vh' }}>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    <Grid item>
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
                    {renderDrugList}
                    <Grid item>{renderDrugInput}</Grid>
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
