import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { MdLogout } from "react-icons/md";
import styles from './Navegacao.module.css'

function Navegacao() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setUsername(username);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/login';
    };

    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <Navbar className={styles.estiloNavbar}>
            <Container>
                <Navbar.Brand href="/" className={styles.estiloNavOptions}>Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/pessoas" className={styles.estiloNavOptions}>Pessoas</Nav.Link>
                    {isAuthenticated ? (
                        <Button onClick={handleLogout} variant='light'>
                            <MdLogout /> Sair
                        </Button>
                    ) : (
                        <Button onClick={handleLogin} variant='light'>Login</Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navegacao;
