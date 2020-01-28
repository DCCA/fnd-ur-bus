import React from "react";

export default function Register() {
  return (
    <div>
      <form className="flex flex-column justify-center align-center">
        <label>
          E-mail:
          <input name="email" type="email" placeholder="e-mail"></input>
        </label>
        <labe>
          Password:
          <input name="password" type="password" placeholder="password"></input>
        </labe>
        <button>Create Account</button>
      </form>
    </div>
  );
}
