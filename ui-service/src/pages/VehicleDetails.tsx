
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_VEHICLES } from "@/graphql/queries"; // Make sure this file exists
import SearchBar from "../components/common/SearchBar";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomTableRow from "@/components/common/CustomTableRow";
import { Outlet } from "react-router";
import type Vehicles from "@/models/Vehicle";

export default function VehicleDetails() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicles[]>([]);

    const { data, loading, error } = useQuery(GET_VEHICLES, {
        variables: { page: 1 },
    });

    const vehicles: Vehicles[] = data?.getVehicles || [];

    useEffect(() => {
        setFilteredVehicles(vehicles);
    }, [vehicles]);

    const searchTermOnChange = (term: string) => {
        setSearchTerm(term);
        setFilteredVehicles(
            vehicles.filter((vehicle) =>
                vehicle.car_model.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    function handleFilter() {}

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading vehicles: {error.message}</p>;

    return (
        <>
            <main className="main-container">
                <div className="vehicle-filter-holder">
                    <h1 className="custom-header">Monitor Your vehicles...</h1>
                    <SearchBar
                        searchTerm={setSearchTerm}
                        searchTermOnChange={searchTermOnChange}
                        search={handleFilter}
                    />
                </div>
                <div className="vehicle-list-holder overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Manufacturer</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>VIN</TableHead>
                            <TableHead className="text-right">Age of the Vehicle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                (searchTerm === "")
                                    ? vehicles.map((v: Vehicles) => (
                                        <CustomTableRow
                                            key={v.id}
                                            vehicle={v}
                                            type="update"
                                        />
                                    ))
                                    : filteredVehicles.map((v: Vehicles) => (
                                        <CustomTableRow
                                            key={v.id}
                                            vehicle={v}
                                            type="update"
                                        />
                                    ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </main>
            <div className="fixed z-10">
                <Outlet />
            </div>
        </>
    );
}
