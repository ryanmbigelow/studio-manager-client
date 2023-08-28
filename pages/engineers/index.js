import { useEffect, useState } from 'react';
import EngineerCard from '../../components/Cards/EngineerCard';
import { getAllEngineers } from '../../utils/data/engineerData';

function EngineerPage() {
  const [engineers, setEngineers] = useState([]);
  const getAllTheEngineers = () => {
    getAllEngineers().then((data) => setEngineers(data));
  };
  useEffect(() => {
    getAllTheEngineers();
  });
  return (
    <div>
      <div className="d-flex">
        {engineers ? engineers.map((engineer) => (
          <EngineerCard key={`engineer--${engineer.id}`} engineerObj={engineer} onUpdate={getAllTheEngineers} />
        )) : 'No engineers on staff'}
      </div>
    </div>
  );
}

export default EngineerPage;
