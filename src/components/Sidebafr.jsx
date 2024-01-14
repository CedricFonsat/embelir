import React from "react";
import { MdOutlineLogout } from "react-icons/md";

const Sidebarfff = ({ logo, altLogo, menuItems, logout }) => {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <img style={{ height: "50px" }} src={logo} alt={altLogo} />
        </div>
        <div className="menu">
          {menuItems.map((item) => (
            <div key={item} className="menu-item">
                 {item.icon}
                <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="logout">
        <button onClick={logout}><MdOutlineLogout style={{marginRight: "10px"}} size={20}/>Logout</button>
      </div>
    </div>
  );
};

export default Sidebarffff;
