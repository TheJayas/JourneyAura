import withSplashScreen from '../withSplashScreen'
import { motion } from "framer-motion";
import { BackgroundBeams } from './ui/background-beams';
import img1 from '../assets/bg_1.jpg'
import { useEffect } from 'react';
// import { Button } from './ui/moving-border';
const Home = () => {
  useEffect(()=>{
    const divAnimate=()=>{
      const inner = document.querySelector<HTMLDivElement>("#inner");
      const innerRect = inner?.getBoundingClientRect();
      const innerHeight = (innerRect) ? innerRect?.bottom - innerRect?.top : null;
      const textEL = document.querySelector<HTMLDivElement>("#textEl");
      const imgEL = document.querySelector<HTMLDivElement>("#imgEl");
      if (!inner || !innerRect || !textEL || !imgEL) return;
      // console.log(innerHeight,window.scrollY);
      textEL.style.left=`${60 + (window.scrollY)}px`;
      imgEL.style.right=`${60 + (window.scrollY)}px`;
      console.log(textEL.style.left);
      console.log(imgEL.style.right);
      // inner.classList.add("h-lvh","w-lvw","flex","justify-center","items-center","relative","top-0","opacity-50");
      // if (innerHeight) {
      //   if (window.scrollY >= 0 && window.scrollY <= innerHeight) {
      //       inner.classList.remove(...inner.classList);
      //       inner.classList.add("h-lvh","w-lvw","flex","justify-center","items-center","relative","top-0","opacity-50");
      //   } else if (window.scrollY >= innerHeight) {
      //       inner.classList.remove(...inner.classList);
      //       inner.classList.add("h-lvh","w-lvw","flex","justify-center","items-center","relative","top-[100vh]");
      //   } else {
      //       inner.classList.remove(...inner.classList);
      //       inner.classList.add("h-lvh","w-lvw","flex","justify-center","items-center","relative","top-0");
      //   }
    // }
    };
    document.addEventListener("scroll", divAnimate);
    return () => document.removeEventListener("scroll", divAnimate);
  },[])
  return (
    <div className=' overflow-x-hidden w-screen h-[200vh]'>
      {/* <h1 className='text-white'>abcd</h1> */}
      <div className='flex flex-row' id='inner'>
        {/* <div id="content" > */}
        <motion.div className="flex flex-col gap-7 items-center justify-center mx-4" id='textEl'
            initial={{
              opacity: 0,
              // if odd index card,slide from right instead of left
              x: -100
            }}
          whileInView={{
          opacity: 1,
          x: 0, // Slide in to its original position
          transition: {
            duration: 1 // Animation duration
          }
          }}          
        >
          <p id="text1" className="text-white text-6xl font-mono pb-4">Indian Railways</p>
          <p id="text2" className="text-white text-2xl text-center ">Build software collaboratively with the power of AI, on any 
          <br/>
          device, without spending a second on setup</p>
          {/* <button id="start" onClick={buttonclickHandler} style={{ boxShadow: "1px 1px 20px blue, -1px -1px 20px blue" }} className="py-3 px-2 text-lg font-semibold rounded-2xl cursor-pointer">Start Creating</button> */}
        </motion.div>
        {/* </div> */}
        <div id="imgEl" className="h-lvh w-1/2 flex justify-center items-center pt-10 pr-2">
          <div className="h-4/5 w-lvw p-1 bg-zinc-600 rounded-2xl">
          <img src={img1} alt="logo"  className="h-full w-full rounded-2xl"/>
          </div>
        </div>
      </div>
      <BackgroundBeams/>
    </div>
  )
}
export default Home;
// export default withSplashScreen(Home);
