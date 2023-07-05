import { useMatch, useNavigate } from "react-router-dom";

function RedirectComponent() {
  const match = useMatch("*");
  const navigate = useNavigate();

  // Perform the redirect when needed
  if (match) {
    navigate("/dashboard");
  }

  // This component doesn't render anything
  return null;
}

export default RedirectComponent;
