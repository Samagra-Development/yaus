
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Protect from "./Protect"
import FormWizard from "./pages/FormWizard";
import LinkManager from "./pages/Link_Manager";
import Recent_Activities from "./pages/Recent_Activities";
import BulkLink from "./pages/BulkLink";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/LinkCreate" component={FormWizard} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/Bulk" ><Protect Cmp={BulkLink}/></Route>
          <Route exact path="/linkmanager"><Protect Cmp={LinkManager}/></Route>
          <Route exact path="/recent"><Protect Cmp={Recent_Activities}/></Route>
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
