import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BackgroundBeams } from "../ui/background-beams";
import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Cards() {
    const [edit,setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }
    const [userDetails,setUserDetails] = useState({name:'',email:'',phoneNumber:'',address:''});
    const token=Cookies.get('token');
    console.log(token);
    useEffect(
        ()=>{
          async function fetchData(){
            try{
              const res = await axios.get('http://localhost:3000/api/v1/user/me',{headers:{'token':token}});
              console.log('res', res)
              if(res.data.success)
                {
                  setUserDetails(res.data.data);
                  console.log('deatails',userDetails);
                }
            }
            catch(err){
              console.log(err);
            }
          }
          fetchData();
    
        },
        []
      )
  return (
    <Card className="w-[500px] h-[550px] bg-transparent rounded-xl">
      <CardHeader>
        <CardTitle className="text-white font-serif">Welcome {userDetails.name}</CardTitle>
        <CardDescription className="text-white font-serif">Your Journey Details at Tips</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" className="w-20 h-30 rounded-full" />
            </div>
            <div className="flex flex-col space-y-1.5 font-serif">
                <Label className="text-white" htmlFor="name">Name</Label>
                <Input id="name" value={userDetails.name} readOnly={!edit && true}/>
                <Label className="text-white" htmlFor="email">Email</Label>
                <Input id="email" value={userDetails.email} readOnly={!edit && true}/>
                <Label className="text-white" htmlFor="number">Phone Number</Label>
                <Input id="number" value={userDetails.phoneNumber} readOnly={!edit && true}/>
                <Label className="text-white" htmlFor="address">Address</Label>
                <Input id="address" value={userDetails.address} readOnly={!edit && true}/>
                {/* {props.passengers.map((passengers: any) => (
                    <Label key={passengers.id}>{passengers.name}</Label>
                ))} */}
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </form>
      </CardContent>
    <CardFooter className="flex justify-center space-x-2">
        <Button onClick={handleEdit} className="text-white hover:bg-white" variant="outline">Edit</Button>
        {edit && <Button onClick={handleEdit} className="text-white hover:bg-white" variant="outline">Save</Button>}
    </CardFooter>
    </Card>
  )
}
