import { links } from "../utilities/constamts";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo">Spotify</div>
      <div className="sidebar-tabs">
        {links.map((link) => {
          return (
            <div className="sidebar-tab">
              <div className="sidebar-tab-logo">{link.icon}</div>
              <div className="sidebar-tab-name">{link.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
