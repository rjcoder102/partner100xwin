import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllUsers, getDownline, getdownrecharge, getSingleUser, updateUserStatus } from '../Redux/Reducer/adminReducer';
import { useParams, useNavigate } from 'react-router-dom';

// DownlineUsers Page Component
const DownlineUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {downlinedata, singleuser, downrechage} = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  
  const [editingId, setEditingId] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  useEffect(() => {
    dispatch(getDownline(id));
    dispatch(getSingleUser(id));
    dispatch(getdownrecharge(id))
  }, [dispatch, id]);

  console.log(downrechage)

  // Calculate total downline balance and count
  const totalDownlineBalance = downlinedata?.reduce((total, user) => total + (parseFloat(user.balance) || 0), 0) || 0;
  const downlineCount = downlinedata?.length || 0;

  const deleteMember = (id) => {
    dispatch(deleteUser(id)).then((res) => {
      if (res.payload.success) {
        dispatch(getDownline(id));
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to delete user");
      }
    });
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
        dispatch(getDownline(id));
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message || "Failed to update status");
      }
    });
    setEditingId(null);
  };

  const getStatusText = (status) => {
    return status === '0' ? 'Active' : 'Blocked';
  };

  const getStatusClass = (status) => {
    return status === '0' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Downline Users</h1>
      </div>

      {/* User Details Section */}
      {singleuser && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{singleuser.fname} {singleuser.lname}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{singleuser.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Code</p>
              <p className="font-medium">{singleuser.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(singleuser.status)}`}>
                {getStatusText(singleuser.status)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Downline Summary Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Downline Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-1 border-[#08c18a]">
            <p className="text-sm ">Total Downline Users</p>
            <p className="text-2xl font-bold ">{downlineCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-1 border-[#08c18a]">
            <p className="text-sm text-green-600">Total Downline Balance</p>
            <p className="text-2xl font-bold text-green-800">${totalDownlineBalance.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-1 border-[#08c18a]">
            <p className="text-sm text-green-600">Total Downline Recharge</p>
            <p className="text-2xl font-bold text-green-800">${downrechage?.totalAmount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-1 border-[#08c18a]">
            <p className="text-sm text-green-600">Total Downline Withdraw</p>
            <p className="text-2xl font-bold text-green-800">${downrechage?.totalwithAmount}</p>
          </div>
        </div>
      </div>

      {/* Downline Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#08c18a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {downlinedata?.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${member?.name || member?.fname}&background=0D8ABC&color=fff`} alt=""/>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member?.fname} {member?.lname}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${member?.balance || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.password}</td>
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-800`}>
                        Active
                      </span>
                    )}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                      </div>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownlineUser;