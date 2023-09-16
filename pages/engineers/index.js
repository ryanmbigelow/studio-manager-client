import { useEffect, useState } from 'react';
import { getAllEngineers } from '../../utils/data/engineerData';
import EngineerTable from '../../components/Tables/EngineerTable';

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
      <h4>Staff Engineers:</h4>
      <table id="homepage-session-table" className="table table-striped table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Is Admin</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {engineers ? engineers.map((engineer) => (
            <EngineerTable key={`engineer--${engineer.id}`} engineerObj={engineer} onUpdate={getAllTheEngineers} />
          )) : 'No engineers on staff'}
        </tbody>
      </table>
    </div>
  );
}

export default EngineerPage;
