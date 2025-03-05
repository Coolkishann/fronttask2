import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './component/PrivateRoutes';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Register from './component/auth/Register';
// import EditTask from './component/task/EditTask'; 

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1rem',
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/edit-task/:taskId" element={<EditTask />} /> */}
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/register" element={<Register />} /> {/* Specific route for the Register page */}
      </Routes>
    </>
  );
}

export default App;
