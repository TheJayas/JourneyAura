import { Component } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";
import { StationColumns } from "../columns/Station-columns";
import { Station } from "../columns/Station-columns";

class Stations extends Component {
constructor(props: any) {
    super(props);
    this.state = {
        stationmodels:{} as {"data": [{"_id":"","stationName":"","stationNumber":1,"platformCount":100,"__v":9}]},
        error: null as string | null
    };
}

state = {
    stationmodels:{} as {"data": [{"_id":"","stationName":"","stationNumber":1,"platformCount":100,"__v":9}]},
    error: null as string | null
};

// Update the state type
componentDidMount() {
    axios.get('http://localhost:3000/api/v1/admin/stationdb')
        .then(response => {
            this.setState({ stationmodels : response.data });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });
}

render() {
    const Smodels=this.state.stationmodels["data"];
    const sampleData=[] as Station[];
    if(Smodels){
        Smodels.forEach(element => {
            sampleData.push({
                "id":element._id,
                "stationName": element.stationName,
                "stationNumber":element.stationNumber,
                "platformCount":element.platformCount
            })
        });
        console.log(Smodels);
    }
    
    return (
        <div className="flex flex-col items-center h-screen w-screen justify-evenly bg-gray-200">
            <h1 className="text-zinc-900 text-5xl h-10  flex flex-col items-center justify-end font-medium font-mono">Stations</h1>
            <div className="flex w-lvw flex-col items-center gap-10 overflow-x-hidden">
            <Button asChild className={"bg-blue-700 rounded-xl hover:bg-blue-600 text-white"}>
                <a href="/admin/stations/add" className="text-white">Add a new Station</a>
            </Button>
            <DataTable columns={StationColumns} data={sampleData} />
            </div>
            <div className="h-20"></div>
        </div>
    );
}

}


export default Stations
