import { Cards } from "./profile/Cards";
import { BackgroundBeams } from "./ui/background-beams";


function Profile() {
    
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