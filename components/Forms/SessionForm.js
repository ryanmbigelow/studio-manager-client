import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createSession, updateSession } from '../../utils/data/sessionData';
import { getAllEngineers } from '../../utils/data/engineerData';

const initialState = {
  artist: '',
  date: '',
  startTime: '',
  endTime: '',
  engineerId: 0,
};

export default function SessionForm({ sessionObj }) {
  const [currentSession, setCurrentSession] = useState(initialState);
  const [engineers, setEngineers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllEngineers().then(setEngineers);
    if (sessionObj.id) {
      setCurrentSession({
        id: sessionObj.id,
        artist: sessionObj.artist,
        date: sessionObj.date,
        startTime: sessionObj.start_time,
        endTime: sessionObj.end_time,
        engineerId: sessionObj.engineer_id?.id,
      });
    }
  }, [sessionObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sessionObj.id) {
      const sessionUpdate = {
        id: currentSession.id,
        artist: currentSession.artist,
        date: currentSession.date,
        startTime: currentSession.startTime,
        endTime: currentSession.endTime,
        engineerId: Number(currentSession.engineerId),
      };
      updateSession(sessionUpdate).then(() => router.push('/'));
    } else {
      const session = {
        artist: currentSession.artist,
        date: currentSession.date,
        startTime: currentSession.startTime,
        endTime: currentSession.endTime,
        engineerId: Number(currentSession.engineerId),
      };
      createSession(session).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Artist</Form.Label>
        <Form.Control name="artist" required value={currentSession.artist} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control name="date" required value={currentSession.date} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control name="startTime" required value={currentSession.startTime} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control name="endTime" required value={currentSession.endTime} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="floatingSelect">
        <Form.Label>Engineer</Form.Label>
        <Form.Select
          name="engineerId"
          onChange={handleChange}
          className="mb-3"
          value={currentSession.engineerId}
          required
        >
          <option value="">Select an Engineer</option>
          {engineers.map((engineer) => (
            <option
              key={engineer.id}
              value={engineer.id}
            >
              {engineer.first_name} {engineer.last_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          {sessionObj.id ? 'Update' : 'Create'} Session
        </Button>
      </Form>
    </>
  );
}

SessionForm.propTypes = {
  sessionObj: PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    date: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    engineer_id: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }),
};

SessionForm.defaultProps = {
  sessionObj: initialState,
};
