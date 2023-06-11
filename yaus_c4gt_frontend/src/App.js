import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Protect from "./Protect"
import {BulkLink,Recent_Activities,LinkManager,FormWizard,Home,SignUp,SignIn} from './pages/index';

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
