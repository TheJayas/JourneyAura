import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { Toaster } from "../ui/sonner";

interface TrainI {
    name: string;
    trainNumber: number;
    seatCount: number;
    coachCount: number;
    runsOnDays: number[];
}

const addTrain = async (data: TrainI) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/train/registerTrain', data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const items = [
    {
      id: 0,
      label: "Sunday",
    },
    {
      id: 1,
      label: "Monday",
    },
    {
      id: 2,
      label: "Tuesday",
    },
    {
      id: 3,
      label: "Wednesday",
    },
    {
      id: 4,
      label: "Thursday",
    },
    {
     id: 5,
     label: "Friday",
    },
    {
      id: 6,
      label: "Saturday",
    },
  ] as const

const TrainSchema = z.object({
    name: z.string().min(1, {
        message: "Train name is required.",
    }),
    trainNumber: z.string().min(1, {
        message: "Train number is required.",
    }),
    seatCount: z.string().min(1, {
        message: "Train seat count is required.",
    }),
    coachCount: z.string().min(1, {
        message: "Train coach count is required.",
    }),
    runsOnDays: z.array(z.number()).refine((val) => val.length > 0, {message: "Please select at least one day."}),
});


const EditTrainForm = () => {
    const route = useNavigate();
    // const response = await axios.get('http://localhost:3000/api/v1/train/getTrainDetails/');

    const form = useForm<z.infer<typeof TrainSchema>>({
        resolver: zodResolver(TrainSchema),
        defaultValues: {
            runsOnDays: [],
        }
    });

    const onSubmit = async (values: z.infer<typeof TrainSchema>) => {
        const toastId = toast.loading(
            "Adding Train, Please Wait...",
        );

        try {
            console.log(values);
            const trainNum=parseInt(values.trainNumber);
            const seatcount=parseInt(values.seatCount);
            const coachcount=parseInt(values.coachCount);
            const runsOnDays=values.runsOnDays;
            const trainName=values.name;
            const data={
                name:trainName,
                trainNumber:trainNum,
                seatCount:seatcount,
                coachCount:coachcount,
                runsOnDays:runsOnDays
            } as TrainI ;
            const res=await addTrain(data);
            console.log(res);
            if(res && res.statusCode==200)
            {
                toast.success(
                    `Train Added Successfully`,
                    {
                        id: toastId,
                    },
                );
                route('/admin/trains');
            }
            else{
                toast.error(`Train add failed`, {
                    id: toastId,
                });
            }
        } catch (error) {
            toast.error(`Train add failed`, {
                id: toastId,
            });
        }
    };

    return (
        <div className="text-black h-full p-8 ">
        {/* <h1>abcd</h1> */}
            <Card className="mx-auto max-w-[500px] text-black">
                <CardHeader>
                    <CardTitle className={"text-black text-center"}>
                        {"Add a new Train"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Train Name</FormLabel>
                                    <FormControl >
                                        <Input
                                            placeholder="Enter Train's name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <FormField
                                control={form.control}
                                name="trainNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Train Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Train Number"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="seatCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seat Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter Train's seat count"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="coachCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Coach Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Train's coach count"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />       
                            <FormField
                                control={form.control}
                                name="runsOnDays"
                                render={() => (
                                <FormItem>
                                <div className="mb-4 ">
                                    <FormLabel className="text-base">Runs On Days</FormLabel>
                                </div>
                                {items.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="runsOnDays"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked: any) => {
                                                    // if(field){console.log(field);}
                                                    return checked
                                                    ? (field.value ? field.onChange([...field.value, item.id]): field.onChange([field.value, item.id]))
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== item.id
                                                        )
                                                      )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            {item.label}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                <FormMessage />
                                </FormItem>
                            )}
                            />                                            
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="disabled:cursor-not-allowed bg-blue-600 rounded-xl hover:bg-blue-500"
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="mr-2 animate-spin"
                                        />
                                        Please Wait
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster/>
        </div>
    );

}

export default EditTrainForm
