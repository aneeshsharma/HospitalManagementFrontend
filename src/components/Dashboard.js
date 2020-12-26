import React from 'react';
import { Container, TextField, Grid, Button, Avatar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

function Login() {
  return (
    <Container maxWidth="100%" style={{height:"100vh"}}>
        <h1> Dashboard </h1>
    </Container>
  );
}
 
export default Login;