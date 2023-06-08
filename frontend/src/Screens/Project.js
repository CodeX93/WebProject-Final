import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../Styles/ScreenStyles/Project.css";
import ProjectProduct from "../Components/ProjectProduct";
import Modal from "react-bootstrap/Modal";
import HeaderNavBar from "../Components/HeaderNavBar";

export default function Project() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(null);
  const [projects, setProjects] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/project/get-specificproject",
        { email }
      );
      setProjects(response.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setEmail(email);
  }, [email, count]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const uploadProject = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/project/upload",
        formData
      );
      return response.data;
    } catch (error) {
      console.log("Error uploading project:", error);
      throw error;
    }
  };

  const handleNewProject = async (e) => {
    e.preventDefault();
    setShowModal(false);

    const formData = new FormData();
    formData.append("ProjectTitle", title);
    formData.append("ProjectDescription", description);
    formData.append("Price", price); // Include the Price field
    formData.append("Email", email);
    formData.append("ProjectCity", city);
    formData.append("ProjectState", state);
    formData.append("ProjectCountry", country);
    formData.append("file", file);

    try {
      const result = await uploadProject(formData);
      console.log("Project saved:", result);
      alert("Project Added Successfully");
      setCount(count + 1);
    } catch (error) {
      console.log("Error saving project:", error);
      alert("Failed to add project");
    }
  };

  return (
    <>
      <div className="Project">
        <HeaderNavBar />
        <div className="UploadSection my-3">
          <h2>Project</h2>
          <Button onClick={handleShow}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                "--fa-primary-opacity": "0.9",
                "--fa-secondary-opacity": "0.1",
              }}
            />
            Project
          </Button>
        </div>

        <div className="ProductGrid">
          <div className="grid-container">
            {projects.map((project) => (
              <div className="grid-item" key={project.id}>
                <ProjectProduct
                  setCount={setCount}
                  count={count}
                  file={`http://localhost:3005/getfile?file=${encodeURIComponent(
                    project.file
                  )}`}
                  Title={project.Title}
                  Price={project.Price}
                  Description={project.Description}
                />
              </div>
            ))}
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleNewProject}>
              <Form.Group controlId="formTitle">
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFile">
                <Form.Label>Image File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
