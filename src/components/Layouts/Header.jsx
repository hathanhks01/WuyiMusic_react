import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Login from '../pages/Auth/Login';  // Import Component Login

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  // State điều khiển modal login

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
          <Button
            className="hover:text-red-700 text-white font-bold"
            type="link"
            icon={<UserOutlined />}
            style={{ fontSize: '16px' }}
            onClick={() => setIsModalOpen(true)}  // Mở modal khi nhấn vào Đăng nhập
          >
            Đăng nhập
          </Button>
        </div>
      </div>

      {/* Modal Login */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <Login setIsModalOpen={setIsModalOpen} />  {/* Pass close function to Login */}
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
Header.defaultProps = {
  onSearch: () => {}, // Một function rỗng để tránh lỗi khi không truyền prop
};
export default Header;
