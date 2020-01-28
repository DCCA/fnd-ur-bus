import React from 'react';

export default function Register() {
  return (
    <div className='m3 border rounded p1'>
      <h2 className='p1 center mb2'>Register</h2>
      <form className='flex flex-column justify-center align-center'>
        <label className='p1'>
          E-mail:
          <input name='email' type='email' placeholder='e-mail'></input>
        </label>
        <label className='p1'>
          Password:
          <input name='password' type='password' placeholder='password'></input>
        </label>
        <button className='mt2 p2 rounded' formAction='submit'>
          Create Account
        </button>
      </form>
    </div>
  );
}
