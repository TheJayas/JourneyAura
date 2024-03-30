import { Component } from "react";
import axios from "axios";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
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
    // const routes=models["routes"];
    // const trains=models.trains;
    // const stations=models.stations;
    // console.log(routes);
    // console.log(trains);
    // console.log(stations);
    return (
        <div className="flex w-lvw flex-col items-center gap-5">
        <div className="flex w-4/5 flex-col items-center gap-5">
            {/* {models.map((model) => {
                const { name, entries, link } = model;
                return (
                    <>
                        <a href={link} className={"group w-full"}>
                            <Card key={name}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="hover:underline">
                                        {name}
                                    </CardTitle>
                                    <CardDescription>
                                    
                                     {entries <= 1 
                                            ? entries + " entry"
                                            : entries + " entries"}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </a>
                    </>
                );
            })} */}
        </div>
    </div>

    );
}

}


export default Admin
