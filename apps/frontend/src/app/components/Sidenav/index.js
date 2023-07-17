import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "app/assets/images/logo.png";
import { ReactComponent as DashboardIcon } from "app/assets/icons/dashboardIcon.svg";
import { ReactComponent as SigninIcon } from "app/assets/icons/signinIcon.svg";
import { ReactComponent as SignupIcon } from "app/assets/icons/signupIcon.svg";
import { ReactComponent as LinkManagerIcon } from "app/assets/icons/linkManager.svg";
import { ReactComponent as RecentActivitiesIcon } from "app/assets/icons/recentActivities.svg";
import { ReactComponent as FormWizardIcon } from "app/assets/icons/formWizard.svg";
import routes from "app/constants/Routes";
function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>YAUS Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {localStorage.getItem("user-info") ? (
          <>
            <Menu.Item key="1">
              <NavLink to={`${routes.DASHBOARD}`}>
                <span
                  className="icon"
                  style={{
                    background: page === "dashboard" ? color : "",
                  }}
                >
                  <DashboardIcon />
                </span>

                <span className="label">Dashboard</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="4">
              <NavLink to={`${routes.CREATE_LINK}`}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  <FormWizardIcon />
                </span>
                <span className="label">Create Link</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to={`${routes.CREATE_BULK_LINK}`}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  <FormWizardIcon />
                </span>
                <span className="label">Create Bulk Link</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="5">
              <NavLink to={`${routes.LINK_MANAGER}`}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  <LinkManagerIcon />
                </span>
                <span className="label">Link Manager</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="4">
              <NavLink to={`${routes.RECENT_ACTIVITIES}`}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  <RecentActivitiesIcon />
                </span>
                <span className="label">Recent Activities</span>
              </NavLink>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="7">
              <NavLink to={`${routes.SIGN_IN}`}>
                <span className="icon">
                  <SigninIcon />
                </span>
                <span className="label">Sign In</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to={`${routes.SIGN_UP}`}>
                <span className="icon">
                  <SignupIcon />
                </span>
                <span className="label">Sign Up</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
}

export default Sidenav;
