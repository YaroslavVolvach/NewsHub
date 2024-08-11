import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
