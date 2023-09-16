import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteEngineer } from '../../utils/data/engineerData';

const EngineerTable = ({ engineerObj, onUpdate }) => {
  const { user } = useAuth();

  // FUNCTION TO DELETE AN ENGINEER
  const deleteThisEngineer = () => {
    if (window.confirm('Are you sure you want to remove this engineer?')) {
      deleteEngineer(engineerObj.id).then(() => onUpdate());
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
            <Link href={`/sessions/edit/${engineerObj.id}`} passHref>
              <Button variant="light" className="btn btn-outline-dark">Edit Engineer</Button>
            </Link>
          </>
        ) : 'Cannot edit'}
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

export default EngineerTable;

EngineerTable.propTypes = {
  engineerObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
