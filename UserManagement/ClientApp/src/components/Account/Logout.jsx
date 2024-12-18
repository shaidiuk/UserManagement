import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLogout());
    navigate("/login")
  }, []);

  return (
    <></>
  );
};

export default LoginForm;