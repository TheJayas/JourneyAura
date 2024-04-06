import withSplashScreen from '../withSplashScreen'
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundBeams } from './ui/background-beams';
import img1 from '../assets/bg_1.jpg'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Button } from './ui/moving-border';
const Home = () => {
  const navigate=useNavigate();
  const onclickHandler = () => {
    console.log("clicked");
    navigate('/booking');
  }

  // const textRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: textRef });
  const y = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  useEffect(()=>{
    const divAnimate=()=>{
      const inner = document.querySelector<HTMLDivElement>("#inner");
      const innerRect = inner?.getBoundingClientRect();
      const textEL = document.querySelector<HTMLDivElement>("#textEl");
      const imgEL = document.querySelector<HTMLDivElement>("#imgEl");
      const text1 = document.querySelector<HTMLParagraphElement>("#text1");
      const text2 = document.querySelector<HTMLParagraphElement>("#text2");
      if (!inner || !innerRect || !textEL || !imgEL || !text1 || !text2) return;
      const k = 300;
      const opacity = 1 - (window.scrollY /k);
      inner.style.opacity = opacity.toString();
      // textEL.style.x=`${-100 + (window.scrollY / k)}px`;
      textEL.style.transition = "transform 0.1s linear";
      textEL.style.transform = `translateX(${-(window.scrollY)}px)`;
      imgEL.style.transition = "transform 0.1s linear";
      imgEL.style.transform = `translateX(${(window.scrollY)}px)`;

    };
    document.addEventListener("scroll", divAnimate);
    return () => document.removeEventListener("scroll", divAnimate);
  },[])
  return (
    <div className='overflow-x-hidden w-full h-[200vh] flex flex-col'>
      <motion.div className='flex flex-row overflow-x-hidden' id='inner'>
      <motion.div className="flex flex-col gap-7 items-center justify-center px-4" id='textEl'
            initial={{
              opacity: 0,
              x: -100
            }}
          whileInView={{
          opacity: 1,
          x: 0, // Slide in to its original position
          transition: {
            duration: 0.7 // Animation duration
          }}}>
          <p id="text1" className="text-white text-6xl font-mono pb-4">Indian Railways</p>
          <p id="text2" className="text-white text-2xl text-center ">Build software collaboratively with the power of AI, on any 
          <br/>
          device, without spending a second on setup</p>
          <button id="start" onClick={onclickHandler} style={{ boxShadow: "1px 1px 20px blue, -1px -1px 20px blue" }} className="py-3 px-2 text-lg font-semibold rounded-2xl cursor-pointer text-white z-30">Book Now</button>
        </motion.div>
        <motion.div id="imgEl" className="h-lvh w-1/2 flex justify-center items-center pt-16 p-4"
            initial={{
              opacity: 0,
              x: 100
            }}
          whileInView={{
          opacity: 1,
          x: 0, // Slide in to its original position
          transition: {
            duration: 0.7 // Animation duration
          }}}>
          <div className="h-4/5 w-screen p-1 bg-zinc-600 rounded-2xl">
          <img src={img1} alt="logo"  className="h-full w-full rounded-2xl"/>
          </div>
        </motion.div>
      </motion.div>
      <motion.div ref={textRef} style={{ y: y }}>
        <h1 className='text-white items-center justify-center flex text-3xl'>Hello</h1>
      </motion.div>
      <div>
      <h1 className='text-white items-center justify-center flex text-3xl'>dfhjkljdfzkjldfx</h1>
      </div>
      <BackgroundBeams className={"h-[200vh]"}/>
    </div>
  )
}
export default Home;
// export default withSplashScreen(Home);
