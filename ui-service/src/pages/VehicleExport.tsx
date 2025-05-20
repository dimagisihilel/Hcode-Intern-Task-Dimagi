import CustomTableRow from "@/components/common/CustomTableRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type Vehicle from "@/models/Vehicle";
import { FaFileExport } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import vehicles from "@/db/Vehicles";

export default function VehicleImport() {

    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    function searchTermOnChange(term: string) {
        /* 
            This function is called when the user types in the search bar.
            It filters the vehicles based on the search term.
            The filtered vehicles are then set to the state variable `filteredVehicles`.
        */
        setFilteredVehicles(
            vehicles.filter((vehicle) => {
                return vehicle.model.toLowerCase().includes(term.toLowerCase());
            })
        );
        setSearchTerm(term)
    }
    function handleFilter() {}

    return (
        <main className="main-container">
            <div className="export-page-header">
                <h1 className="custom-header">Export vehicle data here</h1>
                <SearchBar
                    searchTerm={setSearchTerm}
                    searchTermOnChange={searchTermOnChange}
                    search={handleFilter}
                />
            </div>
            
            <div className="export-page-body">
                <div className="export-btn-holder">
                    <button className="custom-export-btn">
                        Export All
                        <FaFileExport />
                    </button>
                </div>
                <div className="filtered-data-holder">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Manufacturer</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>VIN</TableHead>
                            <TableHead className="text-right">Age of the vehicle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {   
                                /*
                                    filtering data when search input changing
                                */
                                !(searchTerm === "") ? 
                                (
                                    filteredVehicles.map((v: Vehicle) => (
                                        <CustomTableRow key={v.id}
                                            vehicle={v}
                                            type="none"
                                        />
                                    ))
                                ) :
                                (
                                    ""
                                )
                            }
                        </TableBody>
                    </Table>
                    </div>
            </div>
        </main>
    )
}