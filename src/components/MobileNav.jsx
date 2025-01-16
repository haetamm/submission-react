import { Link, useLocation } from "react-router-dom";
import { navItems } from "../utils/fields";
import "../styles/mobile-nav.css";
import { isActive } from "../utils";
import { useDispatch } from "react-redux";

const MobileNav = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <div className="mobile-nav">
      {navItems.map((item) => (
        <div key={item.name} className="nav-item">
          <Link
            to={item.route}
            onClick={
              item.name === "Logout"
                ? () =>
                    dispatch({
                      type: "OPEN_MODAL",
                      payload: {
                        type: "logout",
                      },
                    })
                : null
            }
            className={`nav-link`}
          >
            <item.icon
              className={`icon ${
                isActive(pathname, item.route) ? "active" : ""
              }`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MobileNav;
