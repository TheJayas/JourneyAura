import { Component } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
class Admin extends Component {
constructor(props: any) {
    super(props);
    this.state = {
        models:{} as {"data": {"trains":[],"stations":[],"routes":[]}},
        error: null as string | null
    };
}

state = {
    models: {} as {"data": {"trains":[],"stations":[],"routes":[]}},
    error: null as string | null
};

// Update the state type
componentDidMount() {
    axios.get('http://localhost:3000/api/v1/admin/alldb')
        .then(response => {
            this.setState({ models: response.data });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });
}

render() {
    const models=this.state.models["data"];
    if(models){console.log(models["routes"])}
    if(models){console.log(models["trains"])}
    const countTrains = models ? models["trains"].length: 0;
    const countStations = models ? models["stations"].length: 0;
    const countRoutes = models ? models["routes"].length: 0;
    const models_arr = [
      { name: "Trains", description:"Data of Available Trains",entries: countTrains, link: "/admin/trains" },
      { name: "Stations", description:"Data of Available Stations",entries: countStations, link: "/admin/stations" },
      { name: "Routes", description:"Data of each Train Routes",entries: countRoutes, link: "/admin/routes" }
    ];

    // const routes=models["routes"];
    // const trains=models.trains;
    // const stations=models.stations;
    // console.log(routes);
    // console.log(trains);
    // console.log(stations);
    return (
        <div className="flex flex-col items-center gap-5 h-screen w-screen justify-center bg-zinc-900">
            <h1 className="text-white text-5xl pb-5 font-medium font-mono">Train Models</h1>
          <div className="flex w-4/5 flex-col items-center gap-5">
            <div className="group w-full">
                <Card key={"Models"} className={"border-zinc-500"}>
                    <CardHeader className="items-center justify-between text-zinc-200 p-4 font-serif grid grid-cols-3">
                        <CardTitle className="text-lg hover:animate-bounce text-zinc-200">
                          Models
                        </CardTitle>
                        <CardContent className={"text-lg items-center font-serif p-0"}>
                          Model Description
                        </CardContent>
                        <CardDescription className={"text-lg place-self-end"}>
                          Entry Count
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
          {models_arr.map((model) => {
          const { name,description, entries, link } = model;
            return (
              <>
                <a href={link} className={"group w-full"}>
                    <Card key={name}>
                        <CardHeader className="grid grid-cols-3 items-center p-4">
                            <CardTitle className="hover:underline items-center">
                                {name}
                            </CardTitle>
                            <CardContent className={"text-xl items-center p-0"}>
                            {description}
                            </CardContent>
                            <CardDescription className={"place-self-end"}>
                              {entries <= 1 
                                    ? entries + " Entry"
                                    : entries + " Entries"}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </a>
            </>
          );
        })}
      </div>
    </div>

    );
}

}


export default Admin
