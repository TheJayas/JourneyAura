import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DeleteAlertDialog } from "@/components/delete-alert-dialog";
// import { deleteEvent } from "@/actions/event";
import { toast } from "sonner";

export type RoutesT = {
    id:string;
    routeId: number;
    trainId:number;
    stationId:number;
    arrivalTime:string;
    departureTime:string;
    date:string;
};

export const RoutesColumns: ColumnDef<RoutesT>[] = [
    {
        accessorKey: "routeId",
        header: "Route ID",
    },
    {
        accessorKey: "stationId",
        header: "Station ID",
    },
    {
        accessorKey: "trainId",
        header: "Train ID",
    },
    {
        accessorKey: "arrivalTime",
        header: "Arrival Time",
    },
    {
        accessorKey: "departureTime",
        header: "Departure Time",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const Troutes = row.original;
            const { id } = Troutes;

            const handleDeleteAction = async (onSuccess?: () => void) => {
                const toastId = toast.loading("Deleting Routes, Please Wait...");
                try {
                    // await deleteEvent(id);
                    toast.success("Routes Deleted Successfully", {
                        id: toastId,
                    });
                    onSuccess?.();
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete Routes", { id: toastId });
                }
            };

            return (
                <>
                    <div className="flex gap-2">
                        <Button asChild size={"sm"} variant={"outline"} className={"rounded bg-gray-300 hover:bg-gray-200"}>
                            <a href={`/admin/routes/${id}`}>
                                <Pencil size={16} />
                            </a>
                        </Button>
                        <DeleteAlertDialog action={handleDeleteAction} />
                    </div>
                </>
            );
        },
    },
];
