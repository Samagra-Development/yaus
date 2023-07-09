import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Protect(props) {
  let Component = props.Component;
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/register");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protect;
