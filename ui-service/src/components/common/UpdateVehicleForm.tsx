
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_VEHICLE_BY_ID } from "@/graphql/queries";
import { UPDATE_VEHICLE } from "@/graphql/mutations";
import { IoArrowBackSharp } from "react-icons/io5";
import Form from "./Form";

export default function UpdateVehicleForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_VEHICLE_BY_ID, {
        variables: { id: Number(id) },
    });

    const [updateVehicle] = useMutation(UPDATE_VEHICLE);

    const selectedVehicle = data?.getVehicleById;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const input = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            email: formData.get("email") as string,
            car_make: formData.get("car_make") as string,
            car_model: formData.get("car_model") as string,
            vin: formData.get("vin") as string,
            manufactured_date: formData.get("manufactured_date") as string,
        };

        console.log("Submitting update with:", {
            id: Number(id),
            input
        });

        try {
            await updateVehicle({
                variables: {
                    id: Number(id),
                    input,
                },
                refetchQueries: ["GetVehicleById"],
            });
            alert("Vehicle updated successfully!");
            navigate("/vehicle_details");
        } catch (err: any) {
            console.error("GraphQL error:", err?.graphQLErrors);
            console.error("Network error:", err?.networkError);
            alert("Error updating vehicle.");
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-gray-400/25 p-2 z-11">
            <div className="update-vehicle-form">
                <div className="flex items-center gap-2">
                    <Link to="/vehicle_details" className="custom-back-btn">
                        <IoArrowBackSharp size={20} />
                    </Link>
                    <h1 className="custom-header">Update vehicle details</h1>
                </div>
                <Form
                    type="update"
                    vehicle={selectedVehicle}
                    submit={handleSubmit}
                />
            </div>
        </div>
    );
}
