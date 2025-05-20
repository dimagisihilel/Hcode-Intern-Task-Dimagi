
import type Vehicle from "@/models/Vehicle";
import { useEffect, useState } from "react";

interface FormProps {
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
    type: string;
    vehicle?: Vehicle;
}


export default function Form({ submit, type, vehicle }: FormProps) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        car_make: "",
        car_model: "",
        vin: "",
        manufactured_date: "",
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                first_name: vehicle.first_name || "",
                last_name: vehicle.last_name || "",
                email: vehicle.email || "",
                car_make: vehicle.car_make || "",
                car_model: vehicle.car_model || "",
                vin: vehicle.vin || "",
                manufactured_date: vehicle.manufactured_date || "",
            });
        }
    }, [vehicle]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    return (
         <form className="vehicle-add-form" onSubmit={submit}>
        
        
            <div className="form-group-input">
                <div className="vehicle-add-form-group">
                    <label htmlFor="first_name" className="custom-label">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="custom-input"
                        placeholder="Enter owner firstname"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="vehicle-add-form-group">
                    <label htmlFor="last_name" className="custom-label">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="custom-input"
                        placeholder="Enter owner lastname"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="vehicle-add-form-group">
                <label htmlFor="email" className="custom-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="custom-email-input custom-input"
                    placeholder="Enter owner email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group-input">
                <div className="vehicle-add-form-group">
                    <label htmlFor="car_make" className="custom-label">Manufacturer</label>
                    <input
                        type="text"
                        id="car_make"
                        name="car_make"
                        className="custom-input"
                        placeholder="Enter vehicle manufacturer"
                        value={formData.car_make}
                        onChange={handleChange}
                    />
                </div>
                <div className="vehicle-add-form-group">
                    <label htmlFor="car_model" className="custom-label">Model</label>
                    <input
                        type="text"
                        id="car_model"
                        name="car_model"
                        className="custom-input"
                        placeholder="Enter vehicle model"
                        value={formData.car_model}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group-input">
                <div className="vehicle-add-form-group">
                    <label htmlFor="vin" className="custom-label">VIN</label>
                    <input
                        type="text"
                        id="vin"
                        name="vin"
                        className="custom-input"
                        placeholder="Enter vehicle VIN"
                        value={formData.vin}
                        onChange={handleChange}
                    />
                </div>
                <div className="vehicle-add-form-group">
                    <label htmlFor="manufactured_date" className="custom-label">Manufactured Date</label>
                    <input
                        type="date"
                        id="manufactured_date"
                        name="manufactured_date"
                        className="custom-input"
                        value={formData.manufactured_date}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <button type="submit" className="vehicle-add-button">
                    {type.startsWith("update") ? "Update Vehicle" : "Add Vehicle"}
                </button>
            </div>
        </form>
    );
}
