import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "app/pages/Auth/SignIn";
import SignUp from "app/pages/Auth/SignUp";
import Main from "app/components/Main";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
