import withSplashScreen from '../withSplashScreen'
import { BackgroundBeams } from './ui/background-beams';

const Home = () => {
  return (
    <div className='bg-black h-screen w-screen'>
      {/* <h1 className='text-white'>abcd</h1> */}
      <BackgroundBeams/>
    </div>
  )
}
export default withSplashScreen(Home);
