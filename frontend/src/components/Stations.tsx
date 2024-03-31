import { Component } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { EventColumns } from "./columns/Trains-columns";
class Stations extends Component {
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
    const sample=[{"name":"a","id":"1"},{"name":"b","id":"2"}];
    if(Tmodels){Tmodels.forEach(element => {
        console.log(element);
    });}
    
    // const countTrains = models ? models["trains"].length: 0;
    // const countStations = models ? models["stations"].length: 0;
    // const countRoutes = models ? models["routes"].length: 0;
    // const models_arr = [
    //   { name: "Trains", description:"Data of Available Trains",entries: countTrains, link: "admin/trains" },
    //   { name: "Stations", description:"Data of Available Stations",entries: countStations, link: "admin/stations" },
    //   { name: "Routes", description:"Data of each Train Routes",entries: countRoutes, link: "admin/routes" }
    // ];

    // const routes=models["routes"];
    // const trains=models.trains;
    // const stations=models.stations;
    // console.log(routes);
    // console.log(trains);
    // console.log(stations);
    return (
        <div className="flex flex-col items-center gap-5 h-screen w-screen justify-center bg-white">
            <h1 className="text-black text-5xl pb-5 font-medium font-mono">Trains</h1>
            <div className="flex w-lvw flex-col items-center gap-5 overflow-x-hidden">
            <Button asChild className={"bg-blue-600 rounded-xl hover:bg-blue-400"}>
                <a href="/admin/events/add">Add a new Train</a>
            </Button>

            <DataTable columns={EventColumns} data={sample} />
        </div>
        </div>

    );
}

}


export default Stations
