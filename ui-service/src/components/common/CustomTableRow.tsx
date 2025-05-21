import { TableCell, TableRow } from "@/components/ui/table";
import type Vehicle from "@/models/Vehicle";
import { useEffect, useState } from "react";
import { BsFillPencilFill,BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_VEHICLE } from "@/graphql/mutations"; 
import { toast } from "react-toastify";

export default function CustomTableRow(props: { vehicle: Vehicle, type: string }) {
    const updateRoute = `/vehicle_details/update_vehicle/${props.vehicle.id}`;
    const [calculatedDate, setCalculatedDate] = useState<React.ReactNode>("");

    useEffect(() => {
        const manufacturedYear = new Date(props.vehicle.manufactured_date).getFullYear();
        const currentYear = new Date().getFullYear();
        setCalculatedDate(currentYear - manufacturedYear);
    }, [props.vehicle.manufactured_date]);

    const [deleteVehicle] = useMutation(DELETE_VEHICLE);
    
    const handleDeleteClick = async (id: number) => {
      const confirmed = window.confirm("Are you sure you want to delete this vehicle?");
      if (!confirmed) return;
    
      try {
        await deleteVehicle({
          variables: { id },
          refetchQueries: ["GetVehicles"],
        });
        toast.success("Vehicle deleted successfully");
      } catch (error) {
        toast.error("Error deleting vehicle");
        console.error(error);
      }
    };

    return (
        <TableRow className="relative group hover:bg-gray-100 transition-colors duration-300">
          <TableCell className="font-medium text-[#1DA1FF]">
            {props.vehicle.id}
          </TableCell>
          <TableCell>
            {props.vehicle.first_name} {props.vehicle.last_name}
          </TableCell>
          <TableCell>{props.vehicle.email}</TableCell>
          <TableCell>{props.vehicle.car_make}</TableCell>
          <TableCell>{props.vehicle.car_model}</TableCell>
          <TableCell>{props.vehicle.vin}</TableCell>
          <TableCell className="text-right">{calculatedDate}</TableCell>
      
          {props.type.startsWith("update") && (
            <>
                <td className="row-update-btn-holder flex gap-2 items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={updateRoute} className="w-8 h-8 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-md transition-colors">
                    <BsFillPencilFill size={16} />
                </Link>

                <button onClick={() => handleDeleteClick(props.vehicle.id)} className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 rounded-md transition-colors">
                    <BsFillTrashFill size={16} />
                </button>
                </td>

            </>
          )}
        </TableRow>
      );
}
