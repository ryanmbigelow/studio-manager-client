import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    isAdmin: false,
    profilePicture: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Engineer Info</Form.Label>
        <div>___________________</div>
        {/* FIRST NAME  */}
        <Form.Text className="text-muted">First Name</Form.Text>
        <Form.Control as="textarea" name="firstName" required placeholder="Enter First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        {/* LAST NAME  */}
        <Form.Text className="text-muted">Last Name</Form.Text>
        <Form.Control as="textarea" name="lastName" required placeholder="Enter Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        {/* PROFILE PICTURE  */}
        <Form.Text className="text-muted">Profile Picture URL</Form.Text>
        <Form.Control as="textarea" name="profilePicture" required placeholder="Enter an Image URL for your Profile Picture" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register Account
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
