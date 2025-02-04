import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function PrincipalPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/data/${id}`, { status: newStatus });
      const updatedData = data.map(item => {
        if (item._id === id) {
          const newStatusString = item.status ? `${item.status}, ${newStatus}` : newStatus;
          return { ...item, status: newStatusString };
        }
        return item;
      });
      setData(updatedData);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Principal Dashboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name of the Committee</th>
            <th className="border px-4 py-2">Event Type</th>
            <th className="border px-4 py-2">Event Name</th>
            <th className="border px-4 py-2">Convenor Name</th>
            <th className="border px-4 py-2">Event Date</th>
            <th className="border px-4 py-2">Duration</th>
            <th className="border px-4 py-2">POA PDF</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.committeeName}</td>
              <td className="border px-4 py-2">{item.eventType}</td>
              <td className="border px-4 py-2">{item.eventName}</td>
              <td className="border px-4 py-2">{item.convenorName}</td>
              <td className="border px-4 py-2">{item.eventDate}</td>
              <td className="border px-4 py-2">{item.duration}</td>
              <td className="border px-4 py-2">
                <a href={`http://localhost:5000/uploads/${item.poaPdf}`} target="_blank" rel="noopener noreferrer">View PDF</a>
              </td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleStatusUpdate(item._id, 'Approved by Principal')}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleStatusUpdate(item._id, 'Rejected by Principal')}
                >
                  <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalPage;
