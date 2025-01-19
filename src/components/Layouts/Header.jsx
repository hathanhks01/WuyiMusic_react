import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Login from '../pages/Auth/Login';  

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra thông tin người dùng trong localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo); // Cập nhật trạng thái người dùng
    setIsModalOpen(false); // Đóng modal sau khi đăng nhập
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999] bg-black">
      <div className="flex pr-3 items-center gap-8">
        <Link to="/" className="text-[30px] text-red-700 font-bold">WuyiMusic</Link>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Bạn muốn phát nội dung gì"
            className="bg-gray-800 border border-gray-300 h-8 p-2 w-96 rounded-3xl text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-700 text-white px-3 py-1 rounded-lg ml-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex items-center space-x-5">
        <a href="#" className="hover:text-red-700 text-white">
          For Artist
        </a>
        <div className="actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            // Hiển thị tên người dùng khi đã đăng nhập
            <>
              <span className="text-white">Xin chào, {user.username}</span>
              <Button
                className="hover:text-red-700 text-white font-bold"
                type="link"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            // Hiển thị nút Đăng nhập khi chưa đăng nhập
            <Button
              className="hover:text-red-700 text-white font-bold"
              type="link"
              icon={<UserOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      {/* Modal Login */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <Login 
  setIsModalOpen={setIsModalOpen} 
  onLoginSuccess={handleLoginSuccess} 
/>

            
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
