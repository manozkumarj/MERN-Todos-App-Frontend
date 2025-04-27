import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container m-auto">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 font-bold text-2xl">
        <div className="flex flex-col justify-center items-center">
          <div className="notfound-404">
            <h1 className="text-8xl text-amber-600">404</h1>
          </div>
          <h2>Page not found</h2>
          <Link to={"/"} className="my-3">
            <span className="arrow"></span> Go to Home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
