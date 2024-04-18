import Navbar from "./Navbar";
import { Cards } from "./profile/Cards";
import { BackgroundBeams } from "./ui/background-beams";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Profile() {
    // const [userDetails,setUserDetails] = useState(null);
    // const token=Cookies.get('token');
    // console.log(token);
    // useEffect(
    //     ()=>{
    //       async function fetchData(){
    //         try{
    //           const res = await axios.get('http://localhost:3000/api/v1/user/me',{headers:{'token':token}});
    //           console.log('res', res)
    //           if(res.data.success)
    //             {
    //               setUserDetails(res.data.data);
    //               console.log('deatails',userDetails);
    //             }
    //         }
    //         catch(err){
    //           console.log(err);
    //         }
    //       }
    //       fetchData();
    
    //     },
    //     [userDetails]
    //   )
    return (
        <div>
        {/* {userDetails } */}
            <BackgroundBeams />
            {/* <Navbar /> */}
            <div className="container">
                <div className="flex justify-center items-center h-screen">
                    <Cards />
                </div>
            </div>
        </div>
    )
};

export default Profile;