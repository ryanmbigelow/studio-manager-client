import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getAllSessions } from '../utils/data/sessionData';
import SessionCard from '../components/Cards/SessionCard';

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
      <h1>Hello {user.fbUser.displayName}! </h1>
      <div className="sessionCards">
        {sessions ? sessions.map((session) => (
          <SessionCard key={`session--${session.id}`} sessionObj={session} onUpdate={getAllTheSessions} />
        )) : 'No sessions booked'}
      </div>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
