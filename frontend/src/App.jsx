import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import ViewTask from "./pages/viewTask";
import AddUpdate from "./pages/addUpdate";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import YourTask from "./pages/YourTask";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signin" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <ViewTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/yourTask/task/:id"
          element={
            <PrivateRoute>
              <ViewTask userTask="userTask" />
            </PrivateRoute>
          }
        />
        <Route
          path="/addTask"
          element={
            <PrivateRoute>
              <AddUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <AddUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/yourTask"
          element={
            <PrivateRoute>
              <YourTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
