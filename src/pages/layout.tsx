import "./style/layout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <header>
          <h1>ISM PROJECT</h1>
          <nav>
            <ul>
              <li>
                <a className="tabs" href="#" onClick={() => navigate("/")}>
                  HOME
                </a>
              </li>
              <li>
                <a
                  className="tabs"
                  href="#"
                  onClick={() => navigate("/ip-logs")}
                >
                  IP LOGS
                </a>
              </li>
              <li>
                <a
                  className="tabs"
                  href="#"
                  onClick={() => navigate("/attendance")}
                >
                  ATTENDANCE
                </a>
              </li>
              <li>
                <a
                  className="tabs"
                  href="#"
                  onClick={() => navigate("/reg-ip")}
                >
                  REGISTERED IP
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
