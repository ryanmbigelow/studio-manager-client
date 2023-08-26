import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSession } from '../../utils/data/sessionData';

const SessionCard = ({ sessionObj, onUpdate }) => {
  const deleteThisSession = () => {
    if (window.confirm('Are you sure you want to cacel this session?')) {
      deleteSession(sessionObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="card-space" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Session with {sessionObj.artist}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Engineer: {sessionObj.engineer_id.first_name} {sessionObj.engineer_id.last_name}</Card.Subtitle>
        <Card.Text>Start Time: {sessionObj.start_time}</Card.Text>
        <Card.Text>End Time: {sessionObj.end_time}</Card.Text>
        <Card.Text>
          Date: {sessionObj.date}
        </Card.Text>
        <Link href={`/sessions/edit/${sessionObj.id}`} passHref>
          <Button variant="light" className="btn btn-outline-dark">Edit Session</Button>
        </Link>
        <Button variant="light" className="btn btn-outline-danger" onClick={deleteThisSession}>Cancel Session</Button>
      </Card.Body>
    </Card>
  );
};

export default SessionCard;

SessionCard.propTypes = {
  sessionObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    artist: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    engineer_id: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
