import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchLogin({ email, password }));
    navigate('/view');
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <div className="card-body p-4">
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
          <p className="card-footer bg-transparent bottom-margin-alligne text-center">
            Already have an account?
            <button onClick={() => { navigate('/register'); }} className="btn btn-link">
              Register
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;