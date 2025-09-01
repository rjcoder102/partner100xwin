import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AllUsers, deleteUser, MountAll, MountSingle, updateUserStatus } from '../Redux/Reducer/adminReducer';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Members Page Component
const Member = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const deleteMember = (id) => {
    dispatch(deleteUser(id)).then((res) => {
      if (res.payload.success) {
        dispatch(AllUsers());
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to delete user");
      }
    })
  };

  const updateStatus = (id, currentStatus) => {
    setEditingId(id);
    setTempStatus(currentStatus);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTempStatus('');
  };

  const saveStatus = (id) => {

    dispatch(updateUserStatus({ id: id, status: tempStatus })).then((res) => {
      if (res.payload.success) {
        dispatch(AllUsers());
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to update status");
      }
    })
        setEditingId(null);
  };

  const handlemount = (userId) => {
    console.log(userId)
    dispatch(MountSingle(userId)).then((res) => {
      if (res.payload.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to settle amount");
      }
    })
  }

  const handleAllMount = () => {
    dispatch(MountAll()).then((res) => {
      if (res.payload.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to settle amount");
      }
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Members Management</h1>
                 <button 
                        onClick={handleAllMount}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-md text-base"
                        >
                          Mount All
                        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member?.fname}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.shere_wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member?.created_at ? new Date(member.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === member?.id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="0">Active</option>
                        <option value="1">Blocked</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === '0' ? 'bg-green-100 text-green-800' : member.status === '1' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {member.status === '0' ? 'Active' : member.status === '1' ? 'Blocked' : 'Pending'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === member.id ? (
                      <div className='space-x-2'>
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => saveStatus(member.id)}
                        >
                          Update
                        </button>
                        <button 
                         className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className='space-x-2'>
                        <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => updateStatus(member.id, member.status)}
                        >
                          Update
                        </button>
                        <button 
                     className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs"
                          onClick={() => deleteMember(member?.id)}
                        >
                          Delete
                        </button>
                        <button 
                        onClick={() => navigate(`/downline/${member?.code}`)}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-xs"
                        >
                          Profile
                        </button>
                        <button 
                        onClick={() => handlemount(member?.id)}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md text-xs"
                        >
                          Mount
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

export default Member;