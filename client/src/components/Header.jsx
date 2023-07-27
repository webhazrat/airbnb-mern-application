import { useContext } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="px-5 flex justify-between items-center py-4 border-b border-gray-100">
      <Link to={`/`} href="" className="flex items-center gap-1">
        <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
        <span className="text-2xl font-bold text-primary">airbnb</span>
      </Link>

      <div className="flex items-center gap-5 h-12 px-2 pl-6  border border-gray-200 rounded-full cursor-pointer shadow-sm transition-all hover:shadow-md">
        <div className="font-medium">Anywhere</div>
        <div className="border-l border-gray-200 h-5"></div>
        <div className="font-medium">Any week</div>
        <div className="border-l border-gray-200 h-5"></div>
        <div className="text-gray-500">Add guests</div>
        <button className="w-8 h-8 bg-primary flex items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="font-medium h-11 px-4 rounded-full hover:bg-slate-50">
          Airbnb your home
        </button>
        <button className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-slate-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </button>
        <Link
          to={user ? `/account` : `/login`}
          className="flex items-center gap-2 h-11 px-2 pl-3 border border-gray-200 rounded-full cursor-pointer transition-all hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="w-8 h-8 bg-gray-500 p-[5px] rounded-full flex justify-between items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          {!!user && <div className="pr-2">{user.name}</div>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
