// FeedbackForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap';
import './FeedbackForm.css';

const FormField = ({ label, name, type, value, onChange, checked, children }) => (
    <Form.Group controlId={name} className="form-group">
      <Form.Label className="form-label">{label}</Form.Label>
      <Form.Control as={type === 'select' ? 'select' : (type === 'textarea' ? 'textarea' : 'input')} 
        type={type === 'select' ? null : type}
        name={name} value={value} checked={checked} onChange={onChange}>
        {children}
      </Form.Control>
    </Form.Group>
  );

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    incidentDetails: '',
    date: '',
    location: '',
    incidentDescription: '',
    officerName: '',
    badgeNumber: '',
    officerDescription: '',
    feedbackType: 'complaint',
    feedbackDescription: '',
    anonymous: false,
    acceptTerms: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save data to Google Apps Script web app
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzI_WfUZ2eGMwa-NgH7c6sRA0dbyVDP8jxK3VFx0U0Ry-016RNeAnJ3wadxn18ZE8cF/exec';

    const scriptData = new FormData();
    for (const key in formData) {
      scriptData.append(key, formData[key]);
    }

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: scriptData,
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          incidentDetails: '',
          date: '',
          location: '',
          incidentDescription: '',
          officerName: '',
          badgeNumber: '',
          officerDescription: '',
          feedbackType: 'complaint',
          feedbackDescription: '',
          anonymous: false,
          acceptTerms: false,
        });
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>        
        <p className='pfs_heading'>
            <h1>
                Rajasthan Police Feedback System
            </h1>
        </p>
    <Container className="container-center">
         <Row>
        <Col md={6}>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <FormField  label="Name" name="name" type="text" value={formData.name} onChange={handleChange} />
        <FormField  label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <FormField  label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
        <FormField  label="Address" name="address" type="text" value={formData.address} onChange={handleChange} />
        <FormField  label="Incident Details" name="incidentDetails" type="text" value={formData.incidentDetails} onChange={handleChange} />
        <FormField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
        <FormField label="Location" name="location" type="text" value={formData.location} onChange={handleChange} />
        <FormField label="Description" name="incidentDescription" type="text" value={formData.incidentDescription} onChange={handleChange} />
        <FormField label="Officer Name" name="officerName" type="text" value={formData.officerName} onChange={handleChange} />
        <FormField label="Badge Number" name="badgeNumber" type="text" value={formData.badgeNumber} onChange={handleChange} />
        <FormField label="Officer Description" name="officerDescription" type="text" value={formData.officerDescription} onChange={handleChange} />
        <FormField
          label="Feedback Type"
          name="feedbackType"
          type="select"
          value={formData.feedbackType}
          onChange={handleChange}
        >
          <option value="complaint">Complaint</option>
          <option value="compliment">Compliment</option>
          <option value="suggestions">Suggestions</option>
        </FormField>
        <FormField label="Feedback Message" name="feedbackDescription" type="textarea" value={formData.feedbackDescription} onChange={handleChange} />
        <FormField label="Anonymous" name="anonymous" type="checkbox" checked={formData.anonymous} onChange={handleChange} />
        <FormField label="Accept Terms and Policy" name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} />

        {/* Repeat similar Form.Field elements for each form field */}
        {/* ... */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Col>
      </Row>

      {/* Modal for displaying thank you message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='thank_text'>Your feedback has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='cl_bt_custom' variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};

export default FeedbackForm;
