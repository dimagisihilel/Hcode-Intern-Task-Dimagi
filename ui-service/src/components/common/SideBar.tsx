import { useState } from "react";
import { Link } from "react-router";

export default function SideBar() {

    const [activeItem, setActiveItem] = useState("home");

    /**
     * Changing color if button is active 
     */
    const getItemClasses = (item:string) =>
        activeItem === item
            ? "tab-selection-active"
            : "tab-selection";
    
    return (
        <nav className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/" className={`${getItemClasses("home")}`} onClick={() => setActiveItem("home")}>Home</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/add_vehicle" className={`${getItemClasses("add-vehicle")}`} onClick={() => setActiveItem("add-vehicle")}>Add Vehicles</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/vehicle_details" className={`${getItemClasses("vehicle-details")}`} onClick={() => setActiveItem("vehicle-details")}>Vehicle Details</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/export_vehicles" className={`${getItemClasses("export-vehicle")}`} onClick={() => setActiveItem("export-vehicle")}>Export vehicles</Link>
                </li>
            </ul>
        </nav>
    )
}