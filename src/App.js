import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import Navigation from './Components/Navigation';
import EmpTable from './pages/EmpTable';
import Status from './pages/Status';
import NewEmp from './pages/NewEmp';
import Attendance from './pages/Attendance';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    children: [
      {path:'/admin', element: <Admin />},
      {path:'/status', element: <Status />},
      {path:'/emplist', element: <EmpTable />},
      {path:'/newform', element: <NewEmp />},
      {path:'/attendance', element: <Attendance />}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
