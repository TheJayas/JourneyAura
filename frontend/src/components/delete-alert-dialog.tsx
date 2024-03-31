import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";


interface DeleteAlertDialogProps {
    action: (onSuccess?: () => void) => void;
}

export const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
    action,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className="text-destructive rounded bg-red-600 hover:bg-red-600 "
                >
                    <Trash2 size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the item.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={"border border-black hover:bg-red-600 rounded"}
                        onClick={(e) => action(() => window.location.reload())}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
