import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Account created");

      navigate("/");

    } catch (error) {
      alert("Registration failed");
    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>

    </div>

  );

}

export default Register;