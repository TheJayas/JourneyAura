import Navbar from "./Navbar";
import { Cards } from "./profile/Cards";
import { BackgroundBeams } from "./ui/background-beams";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Profile() {
    const [userDetails,setUserDetails] = useState(null);
    const token=Cookies.get('token');
    console.log(token);
    useEffect(
        ()=>{
          axios.get('http://localhost:3000/api/v1/user/me',{headers:{'token':token}})
          .then((res)=>{
            console.log(res);
            if(res.data.success)
              {
                setUserDetails(res.data.data);
              }
          })
          .catch((err)=>{
            console.log(err);
          });
    
        },
        []
      )
    return (
        <>
            <BackgroundBeams />
            <Navbar />
            <div className="container">
                <div className="flex justify-center items-center h-screen">
                    <Cards props={userDetails}/>
                </div>
            </div>
        </>
    )
};

export default Profile;