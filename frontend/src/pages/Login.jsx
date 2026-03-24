import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Modal } from 'react-bootstrap'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleClose = () => {
    setShow(false);


    if (!isError) {
      navigate("/dashboard");
    }
  };


  const handleLogin = (e) => {
    e.preventDefault();
    setShowSpinner(true);

    axios({
      url: apiUrl + '/api/v1/auth/login',
      method: 'post',
      data: { email, password }
    })
      .then((result) => {
        if (result.data.success) {

          setShowSpinner(false);


          setIsError(false);
          setMessage("Login Successful ");

          setShow(true);


          login(result.data);
        }
      })
      .catch((err) => {
        setShowSpinner(false);


        setIsError(true);

        if (err.response && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Something went wrong");
        }

        setShow(true);
      });
  };

return (
  <>
    <Container fluid className=' vh-100 d-flex align-items-center justify-content-center bg-light'>
      <Row className='w-100 justify-content-center'>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <h3 className='text-center mb-4'>Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" >
                  <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button type='submit' variant="success" className='w-100'>Login</Button>
                <p className="text-sm text-center mt-4">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-indigo-600 font-semibold">Register</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {
        showSpinner && (
          <div className='position-fixed top-50 start-50 translate-middle'>
            <Spinner animation="border" />;
          </div>
        )
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isError ? "Error " : "Success "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body >
          {message}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </>
)
}
export default Login


