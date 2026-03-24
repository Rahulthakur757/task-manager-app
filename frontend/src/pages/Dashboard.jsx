
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Spinner, Modal } from 'react-bootstrap'
import { data } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import { AuthContext } from '../context/AuthContext'

function Dashboard() {
  const [taskTitle, setTaskTitle] = useState('')
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false)

   const handleClose = () => {
    setShow(false)
  };


  const createTask = (e) => {
    e.preventDefault();
    setShowSpinner(true)

    axios({
      url: apiUrl + '/api/v1/task/',
      method: 'post',
      data: { title: taskTitle },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result) => {
      if (result.data.success) {
        setShow(true)
        setShowSpinner(false)
        setTaskTitle('');
        setTasks(prev => [...prev, result.data.data]);
      }
    }).catch((err) => {
      console.log(err)
      setShowSpinner(false)
    })

  }
  useEffect(() => {
    axios({
      url: apiUrl + '/api/v1/task/',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result) => {
      if (result.data.success) {
        console.log(result.data.data, "tasktitle...")
        setTasks(result.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [token])

  function goToTogle(id) {
    const task = tasks.find(t => t._id === id);

    axios({
      url: apiUrl + '/api/v1/task/' + id,
      method: 'put',
      data: {
        status: task.status === 'pending' ? 'completed' : 'pending'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {

      setTasks(prev =>
        prev.map(t =>
          t._id === id ? { ...t, status: res.data.data.status } : t
        )
      );

    }).catch(err => console.log(err));
  }

  function goToDelete(id) {
    axios({
      url: apiUrl + '/api/v1/task/' + id,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result) => {
      if (result.data.success) {
        setTasks(prev => prev.filter(task => task._id !== id));
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Container fluid className="bg-light min-vh-100 py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>


            <Card className="shadow-lg border-0 rounded-4 p-4">

              <h3 className="text-center mb-4">Dashboard</h3>

              <Form onSubmit={createTask}>
                <div className="d-flex gap-2 mb-4">
                  <Form.Control
                    type="text"
                    value={taskTitle}
                    placeholder="Enter your task..."
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="rounded-3"
                  />
                  <Button type="submit" variant="success">
                    Add
                  </Button>
                </div>
              </Form>

              {(
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task) => {

                      const isCompleted = task.status === "completed";

                      return (
                        <tr key={task._id} style={{ transition: "0.2s" }}>

                          <td className={isCompleted ? "text-decoration-line-through text-muted" : ""}>
                            {task.title}
                          </td>


                          <td>
                            <span className={`badge ${isCompleted ? "bg-success" : "bg-warning text-dark"
                              }`}>
                              {task.status}
                            </span>
                          </td>


                          <td>
                            <div className="d-flex gap-2">

                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => goToTogle(task._id)}
                              >
                                toggle
                              </Button>

                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => goToDelete(task._id)}
                              >
                                delete
                              </Button>

                            </div>
                          </td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              )}

              <p className="text-center mt-3 text-muted">
                Total Tasks: {tasks.length}
              </p>

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
          <Modal.Body>Task save successfully</Modal.Body>
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
export default Dashboard;


