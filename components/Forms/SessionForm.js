import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSession, updateSession } from '../../utils/data/sessionData';
import { getAllEngineers } from '../../utils/data/engineerData';
import { createSessionEngineer, getEngineersBySessionId } from '../../utils/data/sessionEngineerData';

const initialState = {
  artist: '',
  date: '',
  startTime: '',
  endTime: '',
  engineerId: 0,
};

export default function SessionForm({ sessionObj, sessionId }) {
  const [currentSession, setCurrentSession] = useState(initialState);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineers, setSelectedEngineers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getEngineersThenSetSelected = () => {
    getEngineersBySessionId(sessionId).then(async (arr) => {
      await setSelectedEngineers(arr);
    });
  };

  const getEngineersThenSet = () => {
    getAllEngineers().then(setEngineers);
  };

  useEffect(() => {
    getEngineersThenSetSelected();
    getEngineersThenSet();
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
  }, [sessionObj, sessionId]);

  console.warn(selectedEngineers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (engineerId) => {
    if (selectedEngineers.some((eng) => eng.id === engineerId)) {
      // if the engineer is already included in the array,
      // we create a new array using .filter that includes every engineer
      // except for the engineer who was deselected
      setSelectedEngineers(selectedEngineers.filter((eng) => eng.id !== engineerId));
    } else {
      // if the engineer is not already included in the array,
      // we use the spread operator to include the selected engineers
      // and we add the newly selected engineer to the array
      const engineer = engineers.filter((eng) => eng.id === engineerId);
      setSelectedEngineers([...selectedEngineers, engineer[0]]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sessionObj.id) {
      const updateSessionWithSessionEngineers = async () => {
        const sessionUpdate = {
          id: currentSession.id,
          artist: currentSession.artist,
          date: currentSession.date,
          startTime: currentSession.startTime,
          endTime: currentSession.endTime,
          engineerId: Number(currentSession.engineerId),
        };
        await updateSession(sessionUpdate);
        const engineerIds = [];
        selectedEngineers.forEach((engineer) => {
          engineerIds.push(engineer.id);
        });
        const payload = {
          engineerIds,
          sessionId: currentSession.id,
        };
        createSessionEngineer(payload);
        router.push('/');
      };
      updateSessionWithSessionEngineers();
    } else {
      const createSessionWithSessionEngineers = async () => {
        const session = {
          artist: currentSession.artist,
          date: currentSession.date,
          startTime: currentSession.startTime,
          endTime: currentSession.endTime,
          engineerId: Number(user.id),
        };
        const newSession = await createSession(session);
        const engineerIds = [];
        selectedEngineers.forEach((engineer) => {
          engineerIds.push(engineer.id);
        });
        const payload = {
          engineerIds,
          sessionId: newSession.id,
        };
        createSessionEngineer(payload);
        router.push('/');
      };
      createSessionWithSessionEngineers();
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

      <Form.Label>Select Engineers:</Form.Label>
      {engineers.map((engineer) => (
        <div className="form-check" key={engineer.id}>
          <input
            className="form-check-input"
            type="checkbox"
            value={engineer.id}
            id={`engineer-${engineer.id}`}
            checked={selectedEngineers.some((eng) => eng.id === engineer.id)}
            onChange={() => handleCheckboxChange(engineer.id)}
          />
          <label className="form-check-label" htmlFor={`engineer-${engineer.id}`}>
            {engineer.first_name} {engineer.last_name}
          </label>
        </div>
      ))}

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
  sessionId: PropTypes.number,
};

SessionForm.defaultProps = {
  sessionObj: initialState,
  sessionId: 0,
};
