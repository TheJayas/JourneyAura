import { Component } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { TrainColumns } from "./columns/Trains-columns";
import { Train } from "./columns/Trains-columns";

class Trains extends Component {
constructor(props: any) {
    super(props);
    this.state = {
        trainmodels:{} as {"data": [{"_id":"","name":"","trainNumber":1,"seatCount":100,"coachCount":10,"runsOnDays":[],"intermediateStations":[],"__v":9}]},
        error: null as string | null
    };
}

state = {
    trainmodels: {} as {"data": [{"_id":"","name":"","trainNumber":1,"seatCount":100,"coachCount":10,"runsOnDays":[],"intermediateStations":[],"__v":9}]},
    error: null as string | null
};

// Update the state type
componentDidMount() {
    axios.get('http://localhost:3000/api/v1/admin/traindb')
        .then(response => {
            this.setState({ trainmodels: response.data });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });
}

render() {
    const Tmodels=this.state.trainmodels["data"];
    const sampleData=[] as Train[];
    if(Tmodels){Tmodels.forEach(element => {
    Tmodels.forEach(element => {
        sampleData.push({
            "id":element._id,
            "name": element.name,
            "trainNumber":element.trainNumber,
            "seatCount":element.seatCount,
            "coachCount": element.coachCount,
            "runsOnDays":element.runsOnDays,
            "intermediateStations":element.intermediateStations
        })
    });
        console.log(element);
    });}
    
    return (
        <div className="flex flex-col items-center h-screen w-screen justify-evenly bg-gray-200">
            <h1 className="text-zinc-900 text-5xl h-10  flex flex-col items-center justify-end font-medium font-mono">Trains</h1>
            <div className="flex w-lvw flex-col items-center gap-10 overflow-x-hidden">
            <Button asChild className={"bg-blue-700 rounded-xl hover:bg-blue-600 text-white"}>
                <a href="/admin/events/add" className="text-white">Add a new Train</a>
            </Button>
            <DataTable columns={TrainColumns} data={sampleData} />
            </div>
            <div className="h-20"></div>
        </div>
    );
}
}

export default Trains
 