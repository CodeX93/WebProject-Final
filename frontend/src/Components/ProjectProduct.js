import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function ProjectProduct(props) {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleDelete = async (e) => {
    const title = e.target.value;

    try {
      const response = await axios.delete(
        `http://localhost:3005/project/delete/${title}`
      );
      console.log(response.data);
      props.setCount(props.count + 1);
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      Title: props.Title,
      Description: description,
      Email: email,
      Price: Price,
      City: city,
      State: state,
      Country: country,
    };

    try {
      const response = await axios.put(
        `http://localhost:3005/project/update/${props.Title}`,
        updateData
      );
      console.log(response.data);
      setShowModal(false);
      props.setCount(props.count + 1);
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.file} />
      <Card.Body>
        <Card.Title>{props.Title}</Card.Title>
        <Card.Text>{"$ " + props.Price}</Card.Text>
        <Card.Text>{props.Description}</Card.Text>
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          value={props.Title}
        >
          Delete
        </Button>
        <Button
          variant="outline-info"
          onClick={handleUpdate}
          value={props.Title}
        >
          Update
        </Button>
      </Card.Body>

      {/* Update Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price $</Form.Label>
              <Form.Control
                type="number"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
