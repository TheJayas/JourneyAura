"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DeleteAlertDialog } from "@/components/delete-alert-dialog";
// import { deleteEvent } from "@/actions/event";
import { toast } from "sonner";

export type Event = {
    name: string;
    id: string;
};

export const EventColumns: ColumnDef<Event>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const event = row.original;
            const { id } = event;

            const handleDeleteAction = async (onSuccess?: () => void) => {
                const toastId = toast.loading("Deleting Event, Please Wait...");
                try {
                    // await deleteEvent(id);
                    toast.success("Event Deleted Successfully", {
                        id: toastId,
                    });
                    onSuccess?.();
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete Event", { id: toastId });
                }
            };

            return (
                <>
                    <div className="flex gap-2">
                        <Button asChild size={"sm"} variant={"outline"}>
                            <a href={`/admin/events/${id}`}>
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
