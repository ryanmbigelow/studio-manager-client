import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleSession } from '../../utils/data/sessionData';
import { getEngineersBySessionId } from '../../utils/data/sessionEngineerData';
import SessionEngineerTable from '../../components/Tables/SessionEngineerTable';

export default function ViewSession() {
  const [sessionDetails, setSessionDetails] = useState([]);
  const [sessionEngineers, setSessionEngineers] = useState([]);
  const router = useRouter();

  const { id } = router.query;

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
          <p className="PD-desc">Booked by: {sessionDetails.engineer_id?.first_name} {sessionDetails.engineer_id?.last_name}
          </p>
          <p className="PD-desc">Date: {sessionDetails.date}
          </p>
          <p className="PD-desc">Start Time: {sessionDetails.start_time}
          </p>
          <p className="PD-desc">End Time: {sessionDetails.end_time}
          </p>
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
