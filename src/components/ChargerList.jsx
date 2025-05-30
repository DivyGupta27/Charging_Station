import React, { useEffect, useState } from 'react';

const ChargerList = () => {
  const [chargers, setChargers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch chargers
  const fetchChargers = () => {
    fetch('http://localhost:8000/api/chargers/getcharger')
      .then((res) => res.json())
      .then((data) => setChargers(data))
      .catch((err) => console.error('Error:', err));
  };

  useEffect(() => {
    fetchChargers();
  }, []);

  // Handle edit field changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Start editing
  const startEdit = (charger) => {
    setEditingId(charger._id);
    setEditData({
      name: charger.name,
      status: charger.status,
      powerOutput: charger.powerOutput,
      connectorType: charger.connectorType,
    });
  };

  // Save edits
  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/chargers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      setEditingId(null);
      fetchChargers();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // Delete a charger
  const deleteCharger = async (id) => {
    if (window.confirm('Are you sure you want to delete this charger?')) {
      try {
        await fetch(`http://localhost:8000/api/chargers/${id}`, {
          method: 'DELETE',
        });
        fetchChargers();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">⚡ Charger Listing</h1>

      {/* Charger Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chargers.map((c) => (
          <div key={c._id} className="bg-white p-4 shadow rounded border">
            {editingId === c._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2 rounded"
                />
                <input
                  type="number"
                  name="powerOutput"
                  value={editData.powerOutput}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2 rounded"
                />
                <select
                  name="connectorType"
                  value={editData.connectorType}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2 rounded"
                >
                  <option value="Type1">Type 1</option>
                  <option value="Type2">Type 2</option>
                  <option value="CCS">CCS</option>
                  <option value="CHAdeMO">CHAdeMO</option>
                </select>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => saveEdit(c._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p>Status: {c.status}</p>
                <p>Power: {c.powerOutput} kW</p>
                <p>Connector: {c.connectorType}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => startEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteCharger(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargerList;
