import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DeleteAlertDialog } from "@/components/adminPanel/delete-alert-dialog";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import axios from "axios";

export type Station = {
    id: string;
    stationName: string;
    stationNumber: number;
    platformCount: number;
};

export const StationColumns: ColumnDef<Station>[] = [
    {
        accessorKey: "stationName",
        header: "Station Name",
    },
    {
        accessorKey: "stationNumber",
        header: "Station Number",
    },
    {
        accessorKey: "platformCount",
        header: "Platform Count",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const station = row.original;
            const { id } = station;

            const handleDeleteAction = async (onSuccess?: () => void) => {
                const toastId = toast.loading("Deleting Station, Please Wait...");
                try {
                    // await deleteEvent(id);
                    const res = await axios.get(`http://localhost:3000/api/v1/station/deleteStationById/${id}`);
                    if(res && res.data.statusCode === 200)
                    {
                        toast.success("Station Deleted Successfully", {
                        id: toastId,
                        });
                        onSuccess?.();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete Station", { id: toastId });
                }
            };

            return (
                <>
                    <div className="flex gap-2">
                        <Button asChild size={"sm"} variant={"outline"} className={"rounded bg-gray-300 hover:bg-gray-200"}>
                            <a href={`/admin/stations/${id}`}>
                                <Pencil size={16} />
                            </a>
                        </Button>
                        <DeleteAlertDialog action={handleDeleteAction} />
                        <Toaster/>
                    </div>
                </>
            );
        },
    },
];
