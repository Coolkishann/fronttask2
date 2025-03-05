// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Login from '../component/auth/Login';
// import Layout from '../component/Layout';
// import useAuth from '../hooks/useAuth';

// function Auth() {
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth) {
//       navigate('/');
//     }
//   }, [auth, navigate]);

//   return (
//     <Layout>
//       <div className="flex justify-center h-screen bg-white text-white">
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="md:mr-4 rounded p-4 ">
//             <Login />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Auth;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../component/auth/Login';
import Layout from '../component/Layout';
import useAuth from '../hooks/useAuth';

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === true) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-white text-black">
        <div className="flex flex-col md:flex-row gap-8 p-6 shadow-lg rounded-md bg-gray-100">
          <Login />
        </div>
      </div>
    </Layout>
  );
}

export default Auth;
