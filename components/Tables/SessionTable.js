import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteSession } from '../../utils/data/sessionData';

const SessionTable = ({ sessionObj, onUpdate }) => {
  const { user } = useAuth();
  const deleteThisSession = () => {
    if (window.confirm('Are you sure you want to cacel this session?')) {
      deleteSession(sessionObj.id).then(() => onUpdate());
    }
  };
  return (
    <tr>
      <th scope="row">{sessionObj.id}</th>
      <td>{sessionObj.artist}</td>
      <td>{sessionObj.start_time}</td>
      <td>{sessionObj.end_time}</td>
      <td>{sessionObj.date}</td>
      <td>{sessionObj.engineer_id.first_name} {sessionObj.engineer_id.last_name}</td>
      <td>
        <Link href={`/sessions/${sessionObj.id}`} passHref>
          <Button variant="light" className="btn btn-outline-success">View Session Details</Button>
        </Link>
      </td>
      <td>
        {user.is_admin === true ? (
          <>
            <Link href={`/sessions/edit/${sessionObj.id}`} passHref>
              <Button variant="light" className="btn btn-outline-primary">Edit Session</Button>
            </Link>
          </>
        ) : 'Cannot edit'}
      </td>
      <td>
        {user.is_admin === true ? (
          <>
            <Button variant="light" className="btn btn-outline-danger" onClick={deleteThisSession}>Cancel Session</Button>
          </>
        ) : 'Cannot delete'}
      </td>
    </tr>
  );
};

export default SessionTable;

SessionTable.propTypes = {
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
