import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Home from "app/pages/Home";
import SignIn from "app/pages/SignIn";
import SignUp from "app/pages/SignUp";
import Main from "app/components/layout/Main";
import Protect from "app/Protect";
import FormWizard from "app/pages/FormWizard";
import BulkLink from "app/pages/BulkLink";
import LinkManager from "app/pages/Link_Manager";
import Recent_Activities from "app/pages/Recent_Activities";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Main />}>
          <Route path="/LinkCreate" element={<FormWizard />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/Bulk" element={<Protect Cmp={BulkLink} />} />
          <Route path="/linkmanager" element={<Protect Cmp={LinkManager} />} />
          <Route path="/recent" element={<Protect Cmp={Recent_Activities} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
