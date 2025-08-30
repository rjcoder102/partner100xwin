import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AllUsers } from '../Redux/Reducer/adminReducer';
import { useSelector } from 'react-redux';

// Members Page Component
const Member = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', balance: '$1,250', joined: 'Jan 12, 2023' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', balance: '$3,420', joined: 'Jan 11, 2023' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Blocked', balance: '$850', joined: 'Jan 10, 2023' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'Active', balance: '$2,150', joined: 'Jan 9, 2023' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch])

  console.log( users )

  const toggleBlockUser = (id) => {
    setMembers(members.map(member => 
      member.id === id 
        ? { ...member, status: member.status === 'Active' ? 'Blocked' : 'Active' } 
        : member
    ));
  };

  const deleteUser = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const startEditing = (id, currentStatus) => {
    setEditingId(id);
    setTempStatus(currentStatus);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTempStatus('');
  };

  const saveStatus = (id) => {
    setMembers(members.map(member => 
      member.id === id 
        ? { ...member, status: tempStatus } 
        : member
    ));
    setEditingId(null);
    setTempStatus('');
  };

  const viewProfile = (id) => {
    // In a real app, this would navigate to the user's profile page
    alert(`Viewing profile of user with ID: ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Members Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${member?.fname}&background=0D8ABC&color=fff`} alt=""/>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member?.fname}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === member.id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Pending">Pending</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-800' : member.status === 'Blocked' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {member.status}
                      </span>
                    )}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.shere_wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === member.id ? (
                      <>
                        <button 
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => saveStatus(member.id)}
                        >
                          Update
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => startEditing(member.id, member.status)}
                        >
                          Update
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 mr-3"
                          onClick={() => deleteUser(member.id)}
                        >
                          Delete
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                        >
                          Profile
                        </button>
                      </>
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

export default Member;