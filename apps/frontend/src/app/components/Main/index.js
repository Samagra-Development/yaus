import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "app/pages/Dashboard";
import Protect from "app/utils/Protect";
import FormWizard from "app/pages/CreateLink";
import BulkLink from "app/pages/CreateBulkLink";
import LinkManager from "app/pages/LinkManager";
import Recent_Activities from "app/pages/RecentActivities";
import Sidenav from "app/components/Sidenav";
import Header from "app/components/Header";
import routes from "app/constants/Routes";
const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, []);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Routes>
            <Route path={`${routes.CREATE_LINK}`} element={<FormWizard />} />
            <Route path={`${routes.DASHBOARD}`} element={<Home />} />
            <Route
              path={`${routes.CREATE_BULK_LINK}`}
              element={<Protect Component={BulkLink} />}
            />
            <Route
              path={`${routes.LINK_MANAGER}`}
              element={<Protect Component={LinkManager} />}
            />
            <Route
              path={`${routes.RECENT_ACTIVITIES}`}
              element={<Protect Component={Recent_Activities} />}
            />
            <Route path="*" element={<Navigate to={`${routes.DASHBOARD}`} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
