import React from "react";
import "../../assets/style/error404.css";

const Error404 = () => {
   return (
      <div className="error-container">
         <h1>404</h1>
         <p>Page not found</p>
         <button onClick={() => window.history.back()}>Go back</button>
      </div>
   );
};

export default Error404;