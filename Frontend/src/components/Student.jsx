import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Student() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    committeeName: '',
    eventType: '',
    eventName: '',
    convenorName: '',
    eventDate: '',
    duration: 0,
    poaPdf: null,
    status: 'Pending from all',
  });
  const [editId, setEditId] = useState(null);

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

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item._id === id);
    setFormData({ ...itemToEdit });
    setEditMode(true);
    setEditId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending from all':
        return 'orange';
      case 'Approved by Principal':
      case 'Approved by HOD':
      case 'Approved by Secretary':
        return 'green';
      case 'Rejected by Principal':
      case 'Rejected by HOD':
      case 'Rejected by Secretary':
        return 'red';
      default:
        return 'black';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('committeeName', formData.committeeName);
      formDataToSend.append('eventType', formData.eventType);
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('convenorName', formData.convenorName);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('poaPdf', formData.poaPdf);
      formDataToSend.append('status', formData.status);

      if (editMode) {
        await axios.put(`http://localhost:5000/api/data/${editId}`, formDataToSend);
      } else {
        await axios.post('http://localhost:5000/api/data', formDataToSend);
      }
      fetchData();
      setShowModal(false);
      setEditMode(false);
      setFormData({
        id: 0,
        committeeName: '',
        eventType: '',
        eventName: '',
        convenorName: '',
        eventDate: '',
        duration: 0,
        poaPdf: null,
        status: 'Pending from all', // Default status
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'poaPdf') {
      setFormData({ ...formData, poaPdf: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add Events</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => { setEditMode(false); setShowModal(true); }}
      >
        Add Data
      </button>
      <div className="mt-4">
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
            {data.map((item, i) => (
              <tr key={i+1}>
                <td className="border px-4 py-2">{i+1}</td>
                <td className="border px-4 py-2">{item.committeeName}</td>
                <td className="border px-4 py-2">{item.eventType}</td>
                <td className="border px-4 py-2">{item.eventName}</td>
                <td className="border px-4 py-2">{item.convenorName}</td>
                <td className="border px-4 py-2">{item.eventDate}</td>
                <td className="border px-4 py-2">{item.duration}</td>
                <td className="border px-4 py-2">
                  <a href={`http://localhost:5000/uploads/${item.poaPdf}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                </td>
                <td className="border px-4 py-2" style={{ color: getStatusColor(item.status) }}>{item.status}</td>
                <td className="border px-4 py-2">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(item._id)} className="cursor-pointer text-blue-500 mr-2" />
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item._id)} className="cursor-pointer text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 overflow-y-auto max-h-96">
          <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Data' : 'Add Data'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="committeeName" className="block text-sm font-medium text-gray-700">Name of the Committee</label>
                <input
                  type="text"
                  id="committeeName"
                  name="committeeName"
                  value={formData.committeeName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />

              </div>
              {/* Add other input fields similarly */}
              <div className="mb-4">
  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
  <input
    type="text"
    id="eventType"
    name="eventType"
    value={formData.eventType}
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
  <input
    type="text"
    id="eventName"
    name="eventName"
    value={formData.eventName}
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="convenorName" className="block text-sm font-medium text-gray-700">Convenor Name</label>
  <input
    type="text"
    id="convenorName"
    name="convenorName"
    value={formData.convenorName}
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
  <input
    type="date"
    id="eventDate"
    name="eventDate"
    value={formData.eventDate}
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
  <input
    type="number"
    id="duration"
    name="duration"
    value={formData.duration}
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="poaPdf" className="block text-sm font-medium text-gray-700">POA PDF</label>
  <input
    type="file"
    id="poaPdf"
    name="poaPdf"
    onChange={handleChange}
    className="border border-gray-300 rounded-md p-2 w-full"
  />
</div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="Pending from all">Pending from all</option>
                  <option value="Approved by Principal">Approved by Principal</option>
                  <option value="Approved by HOD">Approved by HOD</option>
                  <option value="Approved by Secretary">Approved by Secretary</option>
                  <option value="Rejected by Principal">Rejected by Principal</option>
                  <option value="Rejected by HOD">Rejected by HOD</option>
                  <option value="Rejected by Secretary">Rejected by Secretary</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {editMode ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
