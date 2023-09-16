import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deleteSessionEngineer } from '../../utils/data/sessionEngineerData';

const SessionEngineerTable = ({ engineerObj, onUpdate, sessionId }) => {
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
    <tr>
      <th scope="row">{engineerObj.id}</th>
      <td>{engineerObj.first_name}</td>
      <td>{engineerObj.last_name}</td>
      <td>{engineerObj.is_admin === true ? (
        'True'
      ) : 'False'}
      </td>
      <td>
        {user.is_admin === true ? (
          <>
            <Button variant="light" className="btn btn-outline-danger" onClick={deleteThisEngineer}>Remove Engineer</Button>
          </>
        ) : 'Cannot remove'}
      </td>
    </tr>
  );
};

export default SessionEngineerTable;

SessionEngineerTable.propTypes = {
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
