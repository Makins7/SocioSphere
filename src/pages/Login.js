import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

function Login() {

  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const dispatcher = useDispatch();
  const user = useSelector(state => state.currentUser);

  const loginUser = (event) => {
    event.preventDefault();
    
    const user = {
      username: username,
      password: password
    };

    // save into redux
    dispatcher({
      type: 'LOGIN_USER',
      user: user
    })
  }

  const handleUsername = event => {
    setUsername(event.target.value);
  }
  const handlePassword = event => {
    setPassword(event.target.value);
  }

  if (user.username) return "You're logged In";

  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardBody>
        <Form onSubmit={loginUser}>
          <FormGroup>
            <Label>Username</Label>
            <Input onChange={handleUsername} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input onChange={handlePassword} />
          </FormGroup>
          <Button type="submit" color="success">Login</Button>
        </Form>
      </CardBody>
    </Card>
  )
};

export default Login;