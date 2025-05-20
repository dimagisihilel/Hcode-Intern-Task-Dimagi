// import { TableCell, TableRow } from "@/components/ui/table";
// import type Vehicle from "@/models/Vehicle";
// import { useEffect, useState } from "react";
// import { BsFillPencilFill } from "react-icons/bs";
// import { Link } from "react-router-dom";

// export default function CustomTableRow(props: { vehicle: Vehicle, type: string }) {

//     /**
//      * append data id to route path
//      */
//     const updateRoute = `/vehicle_details/update_vehicle/${props.vehicle.id}`;
//     const [calculatedDate, setCalculatedDate] = useState<React.ReactNode>("");

//     useEffect(() => {
//         /**
//          * Calculating vehicle age with current date and vehicle manufacturing date
//          */
//         const manufacturedYear = new Date(props.vehicle.manufacturedDate).getFullYear();
//         const currentYear = new Date().getFullYear();
//         setCalculatedDate(currentYear - manufacturedYear);
//     }, [])

//     return (
//         <TableRow className="relative group hover:bg-gray-100 transition-colors duration-300">
//             <TableCell className="font-medium text-[#1DA1FF]">{props.vehicle.id}</TableCell>
//             <TableCell>{props.vehicle.firstname} {props.vehicle.lastname}</TableCell>
//             <TableCell>{props.vehicle.email}</TableCell>
//             <TableCell>{props.vehicle.manufacturer}</TableCell>
//             <TableCell>{props.vehicle.model}</TableCell>
//             <TableCell>{props.vehicle.VIN}</TableCell>
//             <TableCell className="text-right">{calculatedDate}</TableCell>
//             {
//                 /*
//                     rendering the update button only in vehicle update form
//                 */
//                 props.type.startsWith("update") && 
//                 (
//                     <td className="row-update-btn-holder">
//                         <Link to={updateRoute} className="row-update-btn">
//                             <BsFillPencilFill />
//                         </Link>
//                     </td>
//                 )
//             }
//         </TableRow>
//     )
// }





import { TableCell, TableRow } from "@/components/ui/table";
import type Vehicle from "@/models/Vehicle";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CustomTableRow(props: { vehicle: Vehicle, type: string }) {
    const updateRoute = `/vehicle_details/update_vehicle/${props.vehicle.id}`;
    const [calculatedDate, setCalculatedDate] = useState<React.ReactNode>("");

    useEffect(() => {
        /**
         * Calculate vehicle age using manufactured_date from backend
         */
        const manufacturedYear = new Date(props.vehicle.manufactured_date).getFullYear();
        const currentYear = new Date().getFullYear();
        setCalculatedDate(currentYear - manufacturedYear);
    }, [props.vehicle.manufactured_date]);

    return (
        <TableRow className="relative group hover:bg-gray-100 transition-colors duration-300">
            <TableCell className="font-medium text-[#1DA1FF]">{props.vehicle.id}</TableCell>
            <TableCell>{props.vehicle.first_name} {props.vehicle.last_name}</TableCell>
            <TableCell>{props.vehicle.email}</TableCell>
            <TableCell>{props.vehicle.car_make}</TableCell>
            <TableCell>{props.vehicle.car_model}</TableCell>
            <TableCell>{props.vehicle.vin}</TableCell>
            <TableCell className="text-right">{calculatedDate}</TableCell>
            {
                props.type.startsWith("update") && (
                    <td className="row-update-btn-holder">
                        <Link to={updateRoute} className="row-update-btn">
                            <BsFillPencilFill />
                        </Link>
                    </td>
                )
            }
        </TableRow>
    );
}
