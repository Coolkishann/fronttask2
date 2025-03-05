import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axios.get(`/api/auth/isLoggedIn`, {
        withCredentials: true, // ✅ Allows cookies/session tokens to be sent
      });
      return res.data;
    } catch (err) {
      console.error('Auth check failed:', err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  }, []);

  return { auth };
};



// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const useAuth = () => {
//   const [auth, setAuth] = useState(undefined); // Initialize as undefined to indicate loading state

//   const verifyAuth = async () => {
//     try {
//       const res = await axios.get(`/api/auth/isLoggedIn`, {
//         withCredentials: true, // Ensure cookies (if used) are sent
//       });
//       return res.data.authenticated ?? false; // Ensure it always returns true/false
//     } catch (err) {
//       console.error("Auth check failed:", err);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const fetchAuth = async () => {
//       const isAuthenticated = await verifyAuth();
//       setAuth(isAuthenticated);
//     };

//     fetchAuth();
//   }, []);

//   return { auth };
// };

// export default useAuth;
