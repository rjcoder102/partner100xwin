import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllWithdrawsals, updatewithdrawalStatus } from '../Redux/Reducer/adminReducer';
import { toast } from 'sonner';

// Withdraw Page Component
const WithdrawPage = () => {
  const { withdraws } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, user: 'John Doe', amount: '$250', date: 'Jan 12, 2023', status: 'Completed' },
    { id: 2, user: 'Jane Smith', amount: '$420', date: 'Jan 11, 2023', status: 'Pending' },
    { id: 3, user: 'Robert Johnson', amount: '$150', date: 'Jan 10, 2023', status: 'Rejected' },
    { id: 4, user: 'Sarah Williams', amount: '$350', date: 'Jan 9, 2023', status: 'Completed' },
  ]);

  useEffect(() => {
    dispatch(AllWithdrawsals());
  }, [dispatch])

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
    dispatch(updatewithdrawalStatus({ id: id, status: tempStatus })).then((res) => {
      if (res.payload.success) {
      dispatch(AllWithdrawsals());
        toast.success(res.payload.message);
            setEditingId(null)
      } else {
        toast.error(res.payload.message || "Failed to update status");
            setEditingId(null)
      }
    })
  };

  const deleteRequest = (id) => {
    setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id));
  };

  const viewDetails = (id) => {
    // In a real app, this would show more details about the withdrawal request
    alert(`Viewing details of withdrawal request with ID: ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
 
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdraws?.map((withdrawal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{withdrawal.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{withdrawal.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{withdrawal.usdt_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(withdrawal.date).toDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === withdrawal.id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value={0}>Pending</option>
                        <option value={1}>Completed</option>
                        <option value={2}>Rejected</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${withdrawal.status === 1 ? 'bg-green-100 text-green-800' : 
                          withdrawal.status === 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {withdrawal.status === 1 ? 'Completed' : 
                          withdrawal.status === 0 ? 'Pending' : 
                          'Rejected'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === withdrawal.id ? (
                      <div className="flex space-x-2">
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => saveStatus(withdrawal.id)}
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
                          className="bg-[#08c18a] text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => startEditing(withdrawal.id, withdrawal.status)}
                        >
                          Update
                        </button>
                        {/* <button 
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => deleteRequest(withdrawal.id)}
                        >
                          Delete
                        </button> */}
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

export default WithdrawPage;