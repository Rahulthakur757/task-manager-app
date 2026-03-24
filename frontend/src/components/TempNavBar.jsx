import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

function NavBar() {
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-2">
            <Container>

                
                <Navbar.Brand
                    style={{ cursor: "pointer", fontWeight: "600" }}
                    onClick={() => navigate('/dashboard')}
                >
                     Task Manager
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">

                 
                    <Navbar.Text className="me-3">
                        Welcome,{" "}
                        <span className="fw-bold text-info">
                            {user?.name || "User"}
                        </span>
                    </Navbar.Text>

                    
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={handleLogout}
                    >
                        <FiLogOut className="me-1" />
                        Logout
                    </Button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;