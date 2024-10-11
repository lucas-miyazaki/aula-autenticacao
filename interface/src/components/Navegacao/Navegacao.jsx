import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedNomeUsuario = localStorage.getItem('username');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setNomeUsuario(storedNomeUsuario);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const logout = () => {
        AuthRequests.removeToken();
    }

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    {isAuthenticated ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link style={estiloNavOptions}>Bem vindo, {nomeUsuario}</Nav.Link>
                                <Button variant='light' onClick={logout}>Sair</Button>
                            </Nav>
                        </>
                    ) : (
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;
