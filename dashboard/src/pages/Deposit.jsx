import React, { useState } from 'react';

// Deposit Page Component
const DepositPage = () => {
  const [deposits, setDeposits] = useState([
    { id: 1, user: 'John Doe', amount: '$500', date: 'Jan 12, 2023', status: 'Completed' },
    { id: 2, user: 'Jane Smith', amount: '$300', date: 'Jan 11, 2023', status: 'Pending' },
    { id: 3, user: 'Robert Johnson', amount: '$200', date: 'Jan 10, 2023', status: 'Completed' },
    { id: 4, user: 'Sarah Williams', amount: '$450', date: 'Jan 9, 2023', status: 'Pending' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const startEditing = (id, currentStatus) => {
    setEditingId(id);
    setTempStatus(currentStatus);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTempStatus('');
  };

  const saveStatus = (id) => {
    setDeposits(deposits.map(deposit => 
      deposit.id === id ? { ...deposit, status: tempStatus } : deposit
    ));
    setEditingId(null);
    setTempStatus('');
  };

  const deleteRequest = (id) => {
    setDeposits(deposits.filter(deposit => deposit.id !== id));
  };

  const viewDetails = (id) => {
    // In a real app, this would show more details about the deposit request
    alert(`Viewing details of deposit request with ID: ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Deposit Requests</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${deposit.user}&background=0D8ABC&color=fff`} alt=""/>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{deposit.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === deposit.id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Processing">Processing</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${deposit.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          deposit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          deposit.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'}`}>
                        {deposit.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === deposit.id ? (
                      <div className="flex space-x-2">
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => saveStatus(deposit.id)}
                        >
                          Save
                        </button>
                        <button 
                          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => startEditing(deposit.id, deposit.status)}
                        >
                          Update
                        </button>
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => deleteRequest(deposit.id)}
                        >
                          Delete
                        </button>
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => viewDetails(deposit.id)}
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;