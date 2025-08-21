import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaCopy, FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import DashboardHeader from './DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Redux/reducer/authSlice';

const LinksPage = () => {


  const dispatch = useDispatch()

  const { userInfo, loading } = useSelector((state) => state.auth);

  console.log("from link page", userInfo);


  useEffect(() => {
    // const token = Cookies.get("token");
    if (!userInfo) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const [links, setLinks] = useState([
    {
      id: 1529756,
      url: `https://100xwins.com/register?refercode=${userInfo.code}`,
      comment: '',
      type: 'Register link',
      program: 'Turnover Sharing',
      date: '18.08.2025'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [shareModal, setShareModal] = useState(false);
  const [currentShareLink, setCurrentShareLink] = useState('');

  const filteredLinks = links.filter(link =>
    link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  const handleShareLink = (url) => {
    setCurrentShareLink(url);
    setShareModal(true);
  };

  const shareVia = (method) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(currentShareLink);
    const message = `Check out this link: ${currentShareLink}`;

    switch (method) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${message}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${message}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check this link&body=${message}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank');
    setShareModal(false);
  };

  return (
    <div className=" min-h-screen">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 ">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Links</h1>
              {/* <p className="text-sm text-gray-500 mt-1">
                Showing {filteredLinks.length} of {links.length} links
              </p> */}
            </div>


          </div>

          {/* Links Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LINK</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COMMENT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROGRAM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50 transition-colors ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{link.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <div className="flex items-center">
                        <a target='_blank' href={link.url}>{link.url}</a>
                        {/* <span className="truncate max-w-xs">{link.url}</span> */}
                        <button
                          onClick={() => copyToClipboard(link.url)}
                          className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        placeholder="Add comment"
                        className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-500 py-1 px-2 w-full"
                        value={link.comment}
                        onChange={(e) => {
                          const newLinks = [...links];
                          const index = newLinks.findIndex(l => l.id === link.id);
                          newLinks[index].comment = e.target.value;
                          setLinks(newLinks);
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${link.program === 'Turnover Sharing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {link.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.date}</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-center my-10 space-x-3">
          <button
            onClick={() => handleShareLink(links[0]?.url)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md flex items-center transition-colors duration-200"
          >
            <FaShareAlt className="mr-2" />
            Share Link
          </button>
        </div>

      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Share Link</h2>
            <div className="mb-4">
              <input
                type="text"
                value={currentShareLink}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
            </div>
            <div className="flex justify-between mb-6">
              <button
                onClick={() => shareVia('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <span className="mr-2">WhatsApp</span>
              </button>
              <button
                onClick={() => shareVia('telegram')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <span className="mr-2">Telegram</span>
              </button>
              <button
                onClick={() => shareVia('email')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <span className="mr-2">Email</span>
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShareModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LinksPage;