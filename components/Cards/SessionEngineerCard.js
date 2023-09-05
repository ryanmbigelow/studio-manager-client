import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deleteEngineer } from '../../utils/data/engineerData';

const SessionEngineerCard = ({ sessionEngineerObj, onUpdate }) => {
  const { user } = useAuth();
  console.warn(sessionEngineerObj);
  // FUNCTION TO DELETE AN ENGINEER
  const deleteThisEngineer = () => {
    if (window.confirm('Are you sure you want to remove this engineer?')) {
      deleteEngineer(sessionEngineerObj.engineer_id.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="card-space" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Engineer: {sessionEngineerObj.engineer_id.first_name} {sessionEngineerObj.engineer_id.last_name}</Card.Title>
        <img className="card-img-top" src={sessionEngineerObj.engineer_id.profile_picture} alt="engineer profile" />
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
  sessionEngineerObj: PropTypes.shape({
    engineer_id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      is_admin: PropTypes.bool.isRequired,
      profile_picture: PropTypes.string.isRequired,
    }),
    session_id: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
