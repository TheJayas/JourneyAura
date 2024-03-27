import withSplashScreen from '../withSplashScreen'
import { BackgroundBeams } from './ui/background-beams';

const Home = () => {
  return (
    <div className='bg-black h-screen w-screen'>
      <BackgroundBeams/>
    </div>
  )
}

export default withSplashScreen(Home);
