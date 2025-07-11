import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children,isLoading }) => {
  // console.log("CheckAuth - isAuth:", isAuth, "user:", user);
//    const navigate = useNavigate();
//   useEffect(() => {
//   if (!document.cookie.includes("jwt")) {
//     navigate("/auth/login", { replace: true });      // this was just for practice purpose
//   } 
// }, [isAuth]);

  const location = useLocation();

   if (location.pathname === "/") {
    if (!isAuth) {
      return <Navigate to="/auth/login" replace/>;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace/>;
      } else {
        return <Navigate to="/shop/home" replace/>;
      }
    }
  }

  if (
    !isAuth &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuth &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace/>;
    } else {
      return <Navigate to="/shop/home" replace/>;
    }
  }

  if (isAuth && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" replace/>;
  }
  if (isAuth && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" replace/>;
  }



  return <>{children}</>;
};

export default CheckAuth;
