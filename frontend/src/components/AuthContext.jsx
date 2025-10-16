// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null); // { type: "error"|"success", message: "" }

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // 5 sec baad alert hat jaye
    setTimeout(() => setAlert(null), 5000);
  };

  // ✅ auto-fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setUser(null); // sirf unauthorized case me null karo
        } else {
          console.error("Unexpected fetchUser error:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/user/logout",
        {type:"user"},
        { withCredentials: true }
      );
      setUser(null);
      window.location.href='http://localhost:5173'
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, alert, showAlert }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 

// ✅ custom hook for easy use
export const useAuth = () => useContext(AuthContext);
