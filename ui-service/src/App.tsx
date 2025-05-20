import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import Home from "./pages/Home"
import AddVehicle from "./pages/AddVehicle"
import VehicleDetails from "./pages/VehicleDetails"
import VehicleImport from "./pages/VehicleExport"
import UpdateVehicleForm from "./components/common/UpdateVehicleForm"

export default function App() {
  
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {path: "/", element: <Home />},
        {path: "/add_vehicle", element: <AddVehicle />},
        {
          path: "/vehicle_details", 
          element: <VehicleDetails />, 
          children: [
            {path: "/vehicle_details/update_vehicle/:id", element: <UpdateVehicleForm />},
          ]
        },
        {path: "/export_vehicles", element: <VehicleImport />},
      ]
    }
  ])
  
  return <RouterProvider router={routes} />
}