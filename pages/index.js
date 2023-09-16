import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAllSessions } from '../utils/data/sessionData';
import SessionTable from '../components/Tables/SessionTable';
import mixingBoard from '../public/mixingBoard.jpeg';

function Home() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const getAllTheSessions = () => {
    getAllSessions().then((data) => setSessions(data));
  };
  useEffect(() => {
    getAllTheSessions();
  }, [setSessions]);
  return (
    <div>
      <div id="homepage-greeting">
        <div id="homepage-text">
          <h1>Welcome to Studio Manager, {user.fbUser.displayName}!
          </h1>
          <p id="into-text">Studio Manager is an organizational tool for studio owners to manage both recording sessions and engineers. You can view your sessions below, create a new session by selecting &quot;Book a Session&quot; and manage your engineers in the &quot;Engineers&quot; tab.</p>
          <Link passHref href="/sessions/new">
            <Button>Book a Session</Button>
          </Link>
        </div>
        <div className="padding" />
        <Image id="mixing-board" src={mixingBoard} alt="mixing board" width="3008rem" height="2000" />
      </div>
      <h4>Upcoming Sessions:</h4>
      <table id="homepage-session-table" className="table table-striped table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Artist</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Date</th>
            <th scope="col">Booked By</th>
            <th scope="col">View Details</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sessions ? sessions.map((session) => (
            <SessionTable key={`session--${session.id}`} sessionObj={session} onUpdate={getAllTheSessions} />
          )) : 'No sessions booked'}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
