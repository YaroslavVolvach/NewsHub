import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const MyNavbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('isAuthenticated', 'false');

    setIsAuthenticated(false);
    setIsAdmin(false);

    router.push('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">NewsHub</Navbar.Brand>
      <Nav className="mr-auto">
        {isAuthenticated && isAdmin && (
          <Nav.Link href="article/create-article">Create Article</Nav.Link>
        )}
      </Nav>
      <Nav className="ml-auto">
        {isAuthenticated ? (
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
