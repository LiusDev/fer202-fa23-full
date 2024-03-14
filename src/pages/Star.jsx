import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import Header from '../components/common/Header'
import { useForm } from '../hooks';
import { useState } from 'react';
import { instance } from '../ultils';

const Star = () => {
    const [error, setError] = useState("")
    const form = useForm({
        Fullname: "",
        Male: "",
        Dob: "",
        Description: "",
        Nationality: ""
    })
    const [showAlert, setShowAlert] = useState(false)

    const validateName = () => {
        if (form.values.Fullname.trim() < 1) {
            setError("Name is required")
            return false
        } else {
            setError("")
            return true
        }
    }

    const handleAddStar = async (e) => {
        e.preventDefault()
        if (!validateName()) {
            return
        }

        try {
            await instance.post("/stars", form.values)
            setShowAlert(true)
            form.reset()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Header>
            <Container>
                <h2>Create a new star</h2>
                { showAlert &&
                    <Alert variant="success">Created successfully</Alert>
                }
                <Form onSubmit={ handleAddStar }>
                    <Row className='mb-4'>
                        <Form.Group as={ Col } >
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={ 0 }
                                disabled
                            />
                        </Form.Group>
                        <Form.Group as={ Col } >
                            <Form.Label>Full name*</Form.Label>
                            <Form.Control type="text"
                                { ...form.getInputProps("Fullname") }
                            />
                            { error.length > 0 &&
                                <Form.Text id="passwordHelpBlock" muted>{ error }</Form.Text>
                            }
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={ Col } >
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                type="date"
                                { ...form.getInputProps("Dob") }
                            />
                        </Form.Group>
                        <Form.Group as={ Col } >
                            <Form.Label>Gender</Form.Label>
                            <div className='d-flex gap-4'>
                                <Form.Check type="radio" name="gender" label="Male"
                                    onClick={ () => form.setFieldValue("Male", true) }
                                />
                                <Form.Check type="radio" name='gender' label="Female"
                                    onClick={ () => form.setFieldValue("Male", false) }
                                />
                            </div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={ Col } >
                            <Form.Label>Nationality</Form.Label>
                            <Form.Select
                                { ...form.getInputProps("Nationality") }
                            >
                                <option value="">--Select--</option>
                                <option value="USA">USA</option>
                                <option value="England">England</option>
                                <option value="France">France</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={ Col } >
                            <Form.Group as={ Col } >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text"
                                    { ...form.getInputProps("Description") }
                                />
                            </Form.Group>
                        </Form.Group>
                    </Row>
                    <div className='d-flex align-items-center justify-content-center gap-3 mt-4'>
                        <Button variant="primary" type='submit'>Add</Button>

                        <Button type="button" variant="danger" onClick={ form.reset }>Reset</Button>
                    </div>
                </Form>
            </Container>
        </Header>
    )
}

export default Star