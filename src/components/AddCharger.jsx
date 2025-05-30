import React, { useState } from 'react';

const AddCharger = () => {
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lng: '',
    powerOutput: '',
    connectorType: '',
    status: 'Active',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      name: formData.name,
      location: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
      powerOutput: Number(formData.powerOutput),
      connectorType: formData.connectorType,
      status: formData.status,
    };

    try {
      const res = await fetch('http://localhost:8000/api/chargers/addcharger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to add charger');

      setMessage('✅ Charger added successfully!');
      setFormData({
        name: '',
        lat: '',
        lng: '',
        powerOutput: '',
        connectorType: '',
        status: 'Active',
      });
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add charger.');
    }
  };

  return (
    <div className="px-9">
      <div className="mt-10 pt-6">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Charger</h2>
        {message && <div className="mb-4 text-sm text-blue-600">{message}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
          <input type="text" name="lat" value={formData.lat} onChange={handleChange} placeholder="Latitude" className="border p-2 rounded" required />
          <input type="text" name="lng" value={formData.lng} onChange={handleChange} placeholder="Longitude" className="border p-2 rounded" required />
          <input type="number" name="powerOutput" value={formData.powerOutput} onChange={handleChange} placeholder="Power Output (kW)" className="border p-2 rounded" required />
          <select name="connectorType" value={formData.connectorType} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Connector Type</option>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="col-span-1 md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto">
              Add Charger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCharger;
