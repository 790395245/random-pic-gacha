import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, BookMarked } from 'lucide-react';
import { Menu } from 'antd';

const Header: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <Sparkles size={18} />,
      label: <Link to="/">抽卡大厅</Link>,
    },
    {
      key: '/collection',
      icon: <BookMarked size={18} />,
      label: <Link to="/collection">收藏夹</Link>,
    }
  ];

  return (
    <div data-cmp="Header" className="border-b border-gray-200 px-8 py-2 flex justify-between items-center bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Sparkles className="text-yellow-500" size={28} />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 m-0 leading-none">
          抽
        </h1>
      </div>
      <div className="w-[300px]">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-none justify-end"
        />
      </div>
    </div>
  );
};

export default Header;