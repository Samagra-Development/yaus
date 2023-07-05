import Routes from "../../assets/constants/routes";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboardIcon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profileIcon.svg";
import { ReactComponent as SigninIcon } from "../../assets/icons/signinIcon.svg";
import { ReactComponent as SignupIcon } from "../../assets/icons/signupIcon.svg";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header } = Layout;

function Navbar() {
  return (
    <Header>
      <div className="header-col header-nav">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to={Routes.DASHBOARD}>
              <DashboardIcon />
              <span> Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={Routes.PROFILE}>
              <ProfileIcon />
              <span>Profile</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={Routes.SIGN_UP}>
              <SignupIcon />
              <span> Sign Up</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={Routes.SIGN_IN}>
              <SigninIcon />
              <span> Sign In</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
}

export default Navbar;
