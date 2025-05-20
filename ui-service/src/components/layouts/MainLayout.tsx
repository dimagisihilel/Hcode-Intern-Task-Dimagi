import { Outlet } from "react-router";
import SideBar from "../common/SideBar";
import { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function MainLayout() {

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    /**
     * Handling menu expanding for UI responsiveness
     */
    const getSidebarClasses = () =>
        isSidebarExpanded
            ? "sidebar-expanded"
            : "sidebar-collapsed";

    const getMainContainerClasses = () =>
        isSidebarExpanded
            ? "main-container-expanded"
            : "main-container-collapsed";
    
    return (
        <main className="flex flex-row">
            
            <div className={`sidebar-holder absolute lg:relative ${getSidebarClasses()}`}>
                <SideBar />
            </div>
            <div className={`main-container-holder ${getMainContainerClasses()}`}>
                <button
                        onClick={toggleSidebar}
                        className="toggle-button bg-white border-3 border-gray-400 text-gray-600 p-1 rounded-md mb-4 absolute mt-2 ml-2 hover:opacity-50 z-10"
                    >
                        <MdOutlineSpaceDashboard size={20}/>
                </button>
                <Outlet />
            </div>
        </main>
    )
}