// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import EmpTable from "./pages/EmpTable";
import Status from "./pages/Status";
import NewEmp from "./pages/NewEmp";
import Attendance from "./pages/Attendance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";

// const router = createBrowserRouter([
//   {
//     path: "/admin",
//     element: <Admin />,
//     children: [
//       { path: "/", element: <Admin /> },
//       { path: "/status", element: <Status /> },
//       { path: "/emplist", element: <EmpTable /> },
//       { path: "/newform", element: <NewEmp /> },
//       { path: "/attendance", element: <Attendance /> },
//     ],
//   },
// ]);

function App() {
  return (
    <Router>
      <Navigation>
        <Routes>
          <Route exact path="/" element={<Admin />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/status" element={<Status />}></Route>
          <Route exact path="/emplist" element={<EmpTable />}></Route>
          <Route exact path="/newform" element={<NewEmp />}></Route>
          <Route exact path="/attendance" element={<Attendance />}></Route>
        </Routes>
      </Navigation>
    </Router>
    // <RouterProvider router={router} />;
  );
}

export default App;
