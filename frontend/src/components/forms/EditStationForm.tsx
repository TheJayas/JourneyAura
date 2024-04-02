import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { Toaster } from "../ui/sonner";
import {useState,useEffect } from "react";

interface StationI {
    stationName: string;
    stationNumber: number;
    platformCount: number;
}

const updateStation = async (data: StationI) => {
    try {
        console.log(123);
        const response = await axios.post('http://localhost:3000/api/v1/station/updateStation', data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const StationSchema = z.object({
    stationName: z.string().min(1, {
        message: "Station name is required.",
    }),
    stationNumber: z.string().min(1, {
        message: "Station number is required.",
    }),
    platformCount: z.string().min(1, {
        message: "Station Platform count is required.",
    })
});


const EditStationForm = () => {
    const route = useNavigate();
    const {id} = useParams();
    // console.log(id);
    const [stationData,setStationData]=useState({
        stationName:String(""),
        stationNumber:Number(0),
        platformCount:Number(0),
    });
    const form = useForm<z.infer<typeof StationSchema>>({
        resolver: zodResolver(StationSchema),
    });
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/station/getStationDetailsById/${id}`)
        .then(response=>{
            // console.log(response);
            if(response && response.data.statusCode==200)
            {
                setStationData(response.data.data);
            }
            // console.log(trainData);
        }).catch(error => {
            console.log(error);
        });
        return;
        // if(stationData){console.log(stationData);}
    },[])
    useEffect(()=>{
    form.setValue("stationName", stationData.stationName);
    form.setValue("stationNumber", stationData.stationNumber.toString());
    form.setValue("platformCount", stationData.platformCount.toString());
    },[stationData]);
    const onSubmit = async (values: z.infer<typeof StationSchema>) => {
        const toastId = toast.loading(
            "Adding Station, Please Wait...",
        );

        try {
            console.log(values);
            const stationNum=parseInt(values.stationNumber);
            const platformCnt=parseInt(values.platformCount);
            const stationName=values.stationName;
            const data: StationI = {
                stationName: stationName,
                stationNumber: stationNum,
                platformCount: platformCnt
            };
            console.log(data);
            const res=await updateStation(data);
            console.log(res);
            if(res && res.statusCode==200)
            {
                toast.success(
                    `Station Edited Successfully`,
                    {
                        id: toastId,
                    },
                );
                route('/admin/stations');
            }
            else{
                toast.error(`Station add failed`, {
                    id: toastId,
                });
            }
        } catch (error) {
            toast.error(`Station add failed`, {
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
                        {"Edit the Station"}
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
                            name="stationName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Station Name</FormLabel>
                                    <FormControl >
                                        <Input
                                            placeholder="Enter Station's name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Station Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Station Number"
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
                            name="platformCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Platform Count</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter Station's Platform count"
                                            {...field}
                                        />
                                    </FormControl>
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

export default EditStationForm
