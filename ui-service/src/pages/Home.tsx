import { VehicleChart } from "@/components/common/VehicleChart";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Home() {

    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <main className="main-container">
            <div className="border h-2/5">

            </div>
            <div className="h-4/5 flex gap-2 overflow-auto">
                <div className="w-4/6 h-fit">
                    <VehicleChart />
                </div>
                <div className="w-2/6 flex flex-col gap-5">
                    <div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                            <p className="text-sm text-muted-foreground">
                            An open-source UI component library.
                            </p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>Blog</div>
                            <Separator orientation="vertical" />
                            <div>Docs</div>
                            <Separator orientation="vertical" />
                            <div>Source</div>
                        </div>
                    </div> 
                    <div className="w-fit">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}