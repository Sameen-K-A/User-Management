import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IsAdmin = ({ children }) => {
  const token = useSelector((state) => state.admin.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, []);

  if (token) {
    return children
  }
}

export default IsAdmin;