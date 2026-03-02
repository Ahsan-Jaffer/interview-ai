import React from 'react'
<<<<<<< HEAD

const Register = () => {
  return (
    <div>Register</div>
=======
import {useNavigate, Link} from 'react-router'

const Register = () => {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
        e.preventDefault();
        
    }
  return (
    <main>
    <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder='Enter your Username' required />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder='Enter your Email' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder='Enter your Password' required />
            </div>
            <button className='button primary-button'>Register</button>
        </form>

          <p>Already have an account? <span className='link' onClick={() => navigate('/login')}>Login</span></p>
    </div>
   </main>
>>>>>>> 42da2ee (React Router setup, folder structure and auth pages.)
  )
}

export default Register