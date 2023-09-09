import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SessionForm from '../../../components/Forms/SessionForm';
import { getSingleSession } from '../../../utils/data/sessionData';

const EditSession = () => {
  const [editSession, setEditSession] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleSession(id).then(setEditSession);
  }, [id]);

  return (
    <div>
      <h2>Edit Session</h2>
      <SessionForm sessionObj={editSession} sessionId={Number(id)} />
    </div>
  );
};

export default EditSession;
