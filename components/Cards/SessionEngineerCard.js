import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deleteSessionEngineer } from '../../utils/data/sessionEngineerData';

const SessionEngineerCard = ({ engineerObj, onUpdate, sessionId }) => {
  const { user } = useAuth();

  // FUNCTION TO DELETE AN ENGINEER
  const deleteThisEngineer = () => {
    if (window.confirm('Are you sure you want to remove this engineer from the session?')) {
      deleteSessionEngineer(engineerObj.id, sessionId).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card className="card-space" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Engineer: {engineerObj.first_name} {engineerObj.last_name}</Card.Title>
        <img className="card-img-top" src={engineerObj.profile_picture} alt="engineer profile" />
        <>
          {user.is_admin === true ? (
            <>
              <Button variant="light" className="btn btn-outline-danger" onClick={deleteThisEngineer}>Remove Engineer</Button>
            </>
          ) : ''}
        </>
      </Card.Body>
    </Card>
  );
};

export default SessionEngineerCard;

SessionEngineerCard.propTypes = {
  engineerObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
};
