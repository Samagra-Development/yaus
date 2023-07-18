import { Routes, Route } from "react-router-dom";
import SignIn from "app/pages/Auth/SignIn";
import SignUp from "app/pages/Auth/SignUp";
import Main from "app/components/Main";
import routes from "app/constants/Routes";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`${routes.SIGN_UP}`} element={<SignUp />} />
        <Route path={`${routes.SIGN_IN}`} element={<SignIn />} />
        <Route path="/*" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
