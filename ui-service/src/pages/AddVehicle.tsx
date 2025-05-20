import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_VEHICLE } from "@/graphql/mutations";
import Form from "../components/common/Form";

export default function AddVehicle() {
    const navigate = useNavigate();
    const [addVehicle] = useMutation(ADD_VEHICLE);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const input = {
            first_name: (form.elements.namedItem("first_name") as HTMLInputElement)?.value || "",
            last_name: (form.elements.namedItem("last_name") as HTMLInputElement)?.value || "",
            email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
            car_make: (form.elements.namedItem("car_make") as HTMLInputElement)?.value || "",
            car_model: (form.elements.namedItem("car_model") as HTMLInputElement)?.value || "",
            vin: (form.elements.namedItem("vin") as HTMLInputElement)?.value || "",
            manufactured_date: (form.elements.namedItem("manufactured_date") as HTMLInputElement)?.value || "",
        };

        console.log("Submitting add with:", input);

        try {
            await addVehicle({
                variables: { input },
            });
            alert("Vehicle added successfully!");
            navigate("/vehicle_details");
        } catch (err: any) {
            console.error("GraphQL error:", err?.graphQLErrors);
            console.error("Network error:", err?.networkError);
            alert("Error adding vehicle.");
        }
    }

    return (
        <main className="main-container">
            <div className="vehicle-import-component">
                <h1 className="custom-header">Import your vehicle file</h1>
                <input type="file" className="custom-input !w-[30vw]" />
            </div>

            <div className="vehicle-add-form-holder">
                <h1 className="custom-header">Or Add a new vehicle Manually</h1>
                <Form
                    type="add"
                    submit={handleSubmit}
                />
            </div>
        </main>
    );
}
