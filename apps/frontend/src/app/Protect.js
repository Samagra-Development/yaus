import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Protect(props) {
  let Cmp = props.Cmp;
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/register");
    }
  }, []);

  return (
    <div>
      <Cmp />
    </div>
  );
}

export default Protect;
