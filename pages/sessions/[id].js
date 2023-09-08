import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleSession } from '../../utils/data/sessionData';
import { getSessionEngineersBySessionId } from '../../utils/data/sessionEngineerData';
import SessionEngineerCard from '../../components/Cards/SessionEngineerCard';

export default function ViewSession() {
  const [sessionDetails, setSessionDetails] = useState([]);
  const [sessionEngineers, setSessionEngineers] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getAllSessionEngineers = async () => {
    const engineers = await getSessionEngineersBySessionId(id);
    setSessionEngineers(engineers);
  };

  useEffect(() => {
    getSingleSession(id).then(setSessionDetails);
    getAllSessionEngineers();
  }, [id]);

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
          <div className="d-flex">
            {sessionEngineers ? sessionEngineers.map((engineer) => (
              <SessionEngineerCard key={`engineer--${engineer.id}`} engineerObj={engineer} sessionId={id} onUpdate={getAllSessionEngineers} />
            )) : 'No engineers on this session yet'}
          </div>
          <hr />
        </div>
      </div>
    </div>

  );
}
