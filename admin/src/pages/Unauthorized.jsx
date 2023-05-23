import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      Unauthorized
      <Link to="/login" replace={true}>
        Back to login
      </Link>
    </div>
  );
}

export default Unauthorized;
