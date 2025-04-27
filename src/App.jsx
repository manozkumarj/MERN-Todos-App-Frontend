import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";

// Add a fixed delay so you can see the loading state
// const delayForDemo = (promise) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, 2000);
//   }).then(() => promise);
// }
// const LazyRegistrationComponent = lazy(() => delayForDemo(import('./pages/Registration')));

const LazyRegistrationComponent = lazy(() => import("./pages/Registration"));
const LazyLoginComponent = lazy(() => import("./pages/Login"));
const LazyAboutComponent = lazy(() => import("./pages/About"));
const LazySettingsComponent = lazy(() => import("./pages/Settings"));
const LazyDashboardComponent = lazy(() => import("./pages/Dashboard"));
const LazyProfileComponent = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" Component={LazyRegistrationComponent} />
          <Route path="/about" Component={LazyAboutComponent} />
          <Route path="/registration" Component={LazyRegistrationComponent} />
          <Route path="/login" Component={LazyLoginComponent} />
          <Route path="/settings" Component={LazySettingsComponent} />
          <Route path="/dashboard" Component={LazyDashboardComponent} />
          <Route path="/profile" Component={LazyProfileComponent} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#fff",
            color: "#363636",
          },
        }}
      />
    </div>
  );
}

export default App;
