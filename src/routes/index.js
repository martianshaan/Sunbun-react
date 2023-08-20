/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Navbar from '../components/navbar/navbar';
import ProtectedRoute from './ProtectedRoute';

function Index() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><Navbar /></ProtectedRoute>} />
    </Routes>
  );
}

export { Index };
