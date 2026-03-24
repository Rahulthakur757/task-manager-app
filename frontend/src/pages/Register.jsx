import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Modal } from 'react-bootstrap'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
import {useNavigate} from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false)
    navigate("/login/page")
  };

  const handleRegister = (e) => {

    setShowSpinner(true)
    e.preventDefault();
    const data = {
      name,
      email,
      password
    };

    axios({
      url: apiUrl + '/api/v1/auth/register',
      method: 'post',
      data: data
    }).then((result) => {
      if (result.data.success) {
        setShowSpinner(false)
        setShow(true)
      }
    }).catch((err) => {
      console.log(err);
      setShowSpinner(false)
    })
  }
  return (
    <>
      <Container fluid className=' vh-100 d-flex align-items-center justify-content-center bg-light'>
        <Row className='w-100 justify-content-center'>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className='shadow'>
              <Card.Body>
                <h3 className='text-center mb-4'>Register</h3>
                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Name <span style={{color:"red"}}>*</span></Form.Label>
                    <Form.Control type="text" placeholder="Enter Yours Full Name" onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Email <span style={{color:"red"}}>*</span></Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
                    <Form.Control type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>
                  <Button type='submit' variant="success" className='w-100'>Register</Button>
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
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>User register Successfuly</Modal.Body>
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
export default Register


