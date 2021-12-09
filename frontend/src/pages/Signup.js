import React, { useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const SIGNUP_ROUTE = `${process.env.API_ROUTE}/api/users`;
  useEffect(() => {
    axios.get(SIGNUP_ROUTE);
  }, []);

  return <div>Signup</div>;
}
