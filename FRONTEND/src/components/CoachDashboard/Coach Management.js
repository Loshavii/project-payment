
import React, { useState, useEffect } from 'react';
import "../CSS/CoachManagement.css";

function CoachManagement() {
  const [pendingCoaches, setPendingCoaches] = useState([]);
  const [approvedCoaches, setApprovedCoaches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch pending coaches
    const fetchPendingCoaches = async () => {
      try {
        const response = await fetch('http://localhost:2003/api/coaches/coaches/pending');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPendingCoaches(data);
      } catch (error) {
        setError('Failed to load pending coaches');
      }
    };

    // Fetch approved coaches
    const fetchApprovedCoaches = async () => {
      try {
        const response = await fetch('http://localhost:2003/api/coaches/coaches/approved');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setApprovedCoaches(data);
      } catch (error) {
        setError('Failed to load approved coaches');
      }
    };

    fetchPendingCoaches();
    fetchApprovedCoaches();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:2003/api/coaches/admin/coaches/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Update UI after approval/rejection
      const approvedCoach = pendingCoaches.find(coach => coach._id === id);
      if (status === 'approved') {
        setApprovedCoaches([...approvedCoaches, { ...approvedCoach, status }]);
      }
      setPendingCoaches(pendingCoaches.filter(coach => coach._id !== id));
    } catch (error) {
      setError('Failed to update coach status');
    }
  };

  return (
    <div className="coach-management">
      <h3>Coach Management</h3>
      <p>Manage coaches and approve pending requests.</p>

      <h4>Pending Coach Requests</h4>
      {error && <p className="error-message">{error}</p>}
      {pendingCoaches.length > 0 ? (
        <table className="coach-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingCoaches.map(coach => (
              <tr key={coach._id}>
                <td>{coach.firstName} {coach.lastName}</td>
                <td>{coach.email}</td>
                <td>{coach.specialization}</td>
                <td>{coach.experience} years</td>
                <td>{coach.status}</td>
                <td>
                  <button
                    onClick={() => handleApproval(coach._id, 'approved')}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(coach._id, 'rejected')}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
      )}

      <h4>Approved Coaches</h4>
      {approvedCoaches.length > 0 ? (
        <table className="coach-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedCoaches.map(coach => (
              <tr key={coach._id}>
                <td>{coach.firstName} {coach.lastName}</td>
                <td>{coach.email}</td>
                <td>{coach.specialization}</td>
                <td>{coach.experience} years</td>
                <td>{coach.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved coaches</p>
      )}
    </div>
  );
}

export default CoachManagement;


