import "../styles/Layout-Style.css";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { message, Badge } from "antd";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout efetuado com sucesso");
    navigate("/login");
  };

  const userMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Marcar Consultas ",
      path: "/apply-doctor",
      icon: "fa-solid fa-list",
    },
    {
      id: 3,
      name: "Historico Médico ",
      path: "/history-medical",
      icon: "fa-solid fa-list",
    },
  ];

  const doctorMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Consultas Marcadas",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
  ];

  const adminMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Consultas",
      path: "/admin/doctors",
      icon: "fa-solid fa-list",
    },
    {
      id: 3,
      name: "Usuarios",
      path: "/admin/users",
      icon: "fa-solid fa-list",
    },
    {
      id: 4,
      name: "Cadastro Médicos",
      path: "/admin/medicos",
      icon: "fa-solid fa-list",
    },
    /* {
      id: 4,
      name: "Perfil",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },*/
  ];

  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>PSF</h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={menu.id}>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon} />
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Sair</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate("/get-all-notification");
                  }}
                >
                  <i className="fa-solid fa-bell" />
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
