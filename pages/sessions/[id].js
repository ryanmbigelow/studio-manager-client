import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleSession, deleteSession } from '../../utils/data/sessionData';
import { getEngineersBySessionId } from '../../utils/data/sessionEngineerData';
import SessionEngineerTable from '../../components/Tables/SessionEngineerTable';

export default function ViewSession() {
  const [sessionDetails, setSessionDetails] = useState([]);
  const [sessionEngineers, setSessionEngineers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisSession = () => {
    if (window.confirm('Are you sure you want to cacel this session?')) {
      deleteSession(sessionDetails.id).then(() => router.push('/'));
    }
  };

  const getAllSessionEngineers = async () => {
    const engineers = await getEngineersBySessionId(id);
    setSessionEngineers(engineers);
  };

  useEffect(() => {
    getSingleSession(id).then(setSessionDetails);
    getAllSessionEngineers();
  }, [id, setSessionEngineers]);

  return (
    <div className="post-details-page">
      <Head>
        <title> Session with {sessionDetails.artist} </title>
      </Head>
      <div className="PD-container">
        <div className="PD-detail-container">
          <hr />
          <h4>Session Details:</h4>
          <p className="PD-desc">Booked by: {sessionDetails.engineer_id?.first_name} {sessionDetails.engineer_id?.last_name}
          </p>
          <p className="PD-desc">Date: {sessionDetails.date}
          </p>
          <p className="PD-desc">Start Time: {sessionDetails.start_time}
          </p>
          <p className="PD-desc">End Time: {sessionDetails.end_time}
          </p>
          <h4>Admin Controls:</h4>
          <div className="sessiondetailsactionbuttons">
            <div className="editsessionbutton">
              {user.is_admin === true ? (
                <>
                  <Link href={`/sessions/edit/${sessionDetails.id}`} passHref>
                    <Button variant="light" className="btn btn-outline-primary">Edit Session</Button>
                  </Link>
                </>
              ) : 'Cannot edit'}
            </div>
            <div className="deletesessionbutton">
              {user.is_admin === true ? (
                <>
                  <Button variant="light" className="btn btn-outline-danger" onClick={deleteThisSession}>Cancel Session</Button>
                </>
              ) : 'Cannot delete'}
            </div>
          </div>
          <h4>Session Engineers:</h4>
          <table id="homepage-session-table" className="table table-striped table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Is Admin</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sessionEngineers ? sessionEngineers.map((engineer) => (
                <SessionEngineerTable key={`engineer--${engineer.id}`} engineerObj={engineer} sessionId={id} onUpdate={getAllSessionEngineers} />
              )) : 'No engineers on this session'}
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    </div>

  );
}
