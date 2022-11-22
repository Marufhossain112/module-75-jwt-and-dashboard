import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const ErrorPage = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("logOut");
        toast.success("logged out");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const error = useRouteError();
  return (
    <div>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <button className="btn-primary" onClick={handleLogOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
