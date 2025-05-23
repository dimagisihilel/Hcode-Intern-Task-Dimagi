import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_VEHICLE, UPLOAD_CSV } from "@/graphql/mutations";
import Form from "../components/common/Form";
import { useRef, useState } from "react";
import { uploadClient } from "@/apollo/client";
import { toast } from "react-toastify";

export default function AddVehicle() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const [addVehicle] = useMutation(ADD_VEHICLE); // Uses mainClient
    const [importVehicles] = useMutation(UPLOAD_CSV, {
        client: uploadClient, // ✅ Use the uploadClient explicitly here
    });

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

        try {
            await addVehicle({ variables: { input } });
            //alert("Vehicle added successfully!");
            toast.success("Vehicle added successfully!");
            navigate("/vehicle_details");
        } catch (err: any) {
            console.error("GraphQL error:", err?.graphQLErrors);
            //alert("Error adding vehicle.");
            toast.error("Error adding vehicle.");
        }
    }

    async function handleImportSubmit() {
        if (!file) {
            //alert("Please select a CSV file first.");
            toast.warn("Please select a CSV file first.");
            return;
        }

        try {
            const result = await importVehicles({
                variables: { file }, // ✅ File object here
            });

            console.log("Import result:", result);
            //alert("CSV file uploaded successfully!");
            toast.success("CSV file uploaded successfully!");
        } catch (err: any) {
            console.error("Upload error:", err);
            //alert("CSV import failed.");
            toast.error("CSV import failed.");
        }
    }

    return (
        <main className="main-container">
            <div className="vehicle-import-component">
                <h1 className="custom-header">Import your vehicle file</h1>
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    className="custom-input !w-[30vw]"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                    onClick={handleImportSubmit}
                    className="custom-btn mt-2"
                >
                    Upload CSV
                </button>
            </div>

            <div className="vehicle-add-form-holder">
                <h1 className="custom-header">Or Add a new vehicle Manually</h1>
                <Form type="add" submit={handleSubmit} />
            </div>
        </main>
    );
}


