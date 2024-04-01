import { Component } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { RoutesColumns } from "./columns/Routes-columns";
import { RoutesT } from "./columns/Routes-columns";

class TRoutes extends Component {
constructor(props: any) {
    super(props);
    this.state = {
        routesmodels:{} as {"data": [{"_id":"","routeId":1,"trainId":1,"stationId":100,"arrivalTime":"12:00","departureTime":"12:00","date":"","__v":9}]},
        error: null as string | null
    };
}

state = {
    routesmodels:{} as {"data": [{"_id":"","routeId":1,"trainId":1,"stationId":100,"arrivalTime":"12:00","departureTime":"12:00","date":"","__v":9}]},
    error: null as string | null
};

// Update the state type
componentDidMount() {
    axios.get('http://localhost:3000/api/v1/admin/routedb')
        .then(response => {
            this.setState({ trainmodels: response.data });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });
}

render() {
    const Rmodels=this.state.routesmodels["data"];
    const sampleData=[] as RoutesT[];
    if(Rmodels){
        Rmodels.forEach(element => {
            sampleData.push({
                "id":element._id,
                "routeId": element.routeId,
                "trainId":element.trainId,
                "stationId":element.stationId,
                "arrivalTime":element.arrivalTime,
                "departureTime":element.departureTime,
                "date":element.date
            })
        });
        console.log(Rmodels);
    }
    
    return (
        <div className="flex flex-col items-center h-screen w-screen justify-evenly bg-gray-200">
            <h1 className="text-zinc-900 text-5xl h-10  flex flex-col items-center justify-end font-medium font-mono">Stations</h1>
            <div className="flex w-lvw flex-col items-center gap-10 overflow-x-hidden">
            <Button asChild className={"bg-blue-700 rounded-xl hover:bg-blue-600 text-white"}>
                <a href="/admin/events/add" className="text-white">Add a new Station</a>
            </Button>
            <DataTable columns={RoutesColumns} data={sampleData} />
            </div>
            <div className="h-20"></div>
        </div>
);
}

}


export default TRoutes
