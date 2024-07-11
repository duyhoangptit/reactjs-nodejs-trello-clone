import '~/App.css'
import Board from '~/pages/Boards/_id.jsx'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refresh-token');

    if (token && refreshToken) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        // Lưu token vào localStorage hoặc sessionStorage để sử dụng sau này
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        window.location.replace('/');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [location]);

  return (
    <Board/>
  )
}

export default App
