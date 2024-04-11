import withSplashScreen from '../withSplashScreen'
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundBeams } from './ui/background-beams';
import img1 from '../assets/bg_1.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'
import img9 from '../assets/img9.jpg'
import img10 from '../assets/img10.jpg'
import img11 from '../assets/img11.jpg'
import bimg1 from '../assets/blogImg1.jpg'
import bimg2 from '../assets/blogImg2.jpg'
import bimg3 from '../assets/blogImg3.jpg'
import bimg4 from '../assets/blogImg4.jpg'
import bimg5 from '../assets/blogImg5.jpg'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroParallax } from './hero-parallax';
import { EvervaultCard, Icon } from './ui/evervault-card';
import { HomeIcon, MailIcon, MoveRight, Phone, TicketCheck} from 'lucide-react';
import { SocialIcon } from 'react-social-icons'

// import { Button } from './ui/moving-border';
const Home = () => {

  const navigate=useNavigate();
  const onclickHandler = () => {
    // console.log("clicked");
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
      const rotationAngle = window.scrollY / 10;
      const textSize = 100 + window.scrollY / 10;
      textEL.style.transition = "transform 0.1s linear";
      textEL.style.transform = `translateX(${-(window.scrollY)}px) rotate(${-rotationAngle}deg) scale(${textSize / 100})`;
      imgEL.style.transition = "transform 0.1s linear";
      imgEL.style.transform = `translateX(${(window.scrollY)}px) rotate(${rotationAngle}deg)`;
      const rootEl = document.querySelector<HTMLDivElement>("#inner");
      if (rootEl) {
        rootEl.style.overflowY = "hidden";
      }
      const text3 = document.querySelector<HTMLParagraphElement>("#text3");
      if (text3) {
        const opacity = Math.min(window.scrollY / 400, 1);
        const fontSize = 40 + window.scrollY / 50;
        text3.style.opacity = opacity.toString();
        text3.style.fontSize = `${fontSize}px`;
        const text3Rect = text3.getBoundingClientRect();
        const text3Top = text3Rect.top;
        if (text3Top < text3Rect.height*4 + 8 ) {
          const opacity1 = Math.min(text3Top/130, 1);
          const fontSize1 = 40 + text3Top/ 30;
          text3.style.opacity = opacity1.toString();
          text3.style.transition = "font-size 0.1s linear";
          text3.style.fontSize = `${fontSize1}px`;
        }
      }

    };
    document.addEventListener("scroll", divAnimate);
    return () => document.removeEventListener("scroll", divAnimate);
  },[])
  return (
    <div className='overflow-x-hidden overflow-y-hidden w-full h-[950vh] flex flex-col'>
      <motion.div className='flex flex-row overflow-x-hidden overflow-y-hidden' id='inner'>
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
          <p id="text2" className="text-white text-2xl text-center "> Your Premier Railway Ticket Booking Platform Ensuring 
          <br/>
          Unwavering Safety, Security, and Punctuality</p>
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
        <h1 id='text3' className='text-white items-center justify-center flex text-xl'>Features and Services, crafted to cater to your needs.</h1>
      </motion.div>
      <div>
        <HeroParallax products={products} />
      </div>
      <h1 className="text-white text-6xl font-mono pb-4 items-center justify-center flex">HOLIDAYS</h1>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[35rem] mt-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
          <EvervaultCard image={bimg1} />
          <h2 className="text-white mt-4 text-xl font-light">
          Maharajas' Express
          </h2>
          <div className='border-t-2 border-zinc-400 w-[22rem] h-1 mt-2'></div>
          <h2 className="text-white mt-4 text-sm font-light">
            Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an “Experience Unsurpassed”. It has been a winner of “World’s Leading Luxury train” by World Travel Awards consecutively for last six years.
          </h2>
          <a className='flex felx-row align-middle justify-center items-center' href='/booking'>
            <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5 hover:bg-blue-600">
              Book Now
            </p>
            <MoveRight className="h-6 w-6 text-white ml-2 mt-4"/>
          </a>
          </div>
          <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[35rem] mt-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
          <EvervaultCard image={bimg2} />
          <h2 className="text-white mt-4 text-xl font-light">
          International Packages
          </h2>
          <div className='border-t-2 border-zinc-400 w-[22rem] h-1 mt-2'></div>
          <h2 className="text-white mt-4 text-sm font-light">
            Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa charges and overseas medical insurance to give you a hassle-free and memorable experience.
          </h2>
          <a className='flex felx-row align-middle justify-center items-center' href='/booking'>
            <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5 hover:bg-blue-600">
              Book Now
            </p>
            <MoveRight className="h-6 w-6 text-white ml-2 mt-4"/>
          </a>
          </div>  
        </div> 
        <div className='flex flex-row'>
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[35rem] mt-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
          <EvervaultCard image={bimg4} />
    
          <h2 className="text-white mt-4 text-xl font-light">
          Domestic Air Packages
          </h2>
          <div className='border-t-2 border-zinc-400 w-[22rem] h-1 mt-2'></div>
          <h2 className="text-white mt-4 text-sm font-light">
          Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes or Picturesque Islands, IRCTC has it all. Discover India through IRCTC!
          </h2>
          <a className='flex felx-row align-middle justify-center items-center' href='/booking'>
            <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5 hover:bg-blue-600">
              Book Now
            </p>
            <MoveRight className="h-6 w-6 text-white ml-2 mt-4"/>
          </a>
          </div>
          <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[35rem] mt-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
          <EvervaultCard image={bimg5} />
    
          <h2 className="text-white mt-4 text-xl font-light">
          Bharat Gaurav Tourist Train

          </h2>
          <div className='border-t-2 border-zinc-400 w-[22rem] h-1 mt-2'></div>
          <h2 className="text-white mt-4 text-sm font-light">
          IRCTC operates Bharat Gaurav Tourist Train having AC III-Tier accommodation on train specially designed to promote domestic tourism in India. This train runs on various theme based circuits covering pilgrimage and heritage destinations in its itinerary on a 5 days to 20 days trip and showcase India’s rich cultural heritage
          </h2>
          <a className='flex felx-row align-middle justify-center items-center' href='/booking'>
            <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5 hover:bg-blue-600">
              Book Now
            </p>
            <MoveRight className="h-6 w-6 text-white ml-2 mt-4"/>
          </a>
          </div>
        </div>
        <div className='flex flex-row'>
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[35rem] mt-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
          <EvervaultCard image={bimg3} />
    
          <h2 className="text-white mt-4 text-xl font-light">
          Rail Tour Packages
          </h2>
          <div className='border-t-2 border-zinc-400 w-[22rem] h-1 mt-2'></div>
          <h2 className="text-white mt-4 text-sm font-light">
          IRCTC offers Exclusive Rail tour packages with confirmed train tickets, sight-seeing and meals for enchanting Nilgiri Mountains, Darjeeling, Kullu Manali, Kashmir, Gangtok or divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi, Tirupati etc. Holiday packages/ Land packages to these destinations are also available.
          </h2>
          <a className='flex felx-row align-middle justify-center items-center' href='/booking'>
          <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5 hover:bg-blue-600">
            Book Now
          </p>
          <MoveRight className="h-6 w-6 text-white ml-2 mt-4"/>
          </a>
          </div>  
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 h-40 mt-20 bg-gradient-to-r from-zinc-900 to-[#717568] flex flex-row items-center justify-center space-x-4'>
            <h1 className='text-center text-zinc-300 font-serif pr-4'>Establish Communication With Us</h1>
            <SocialIcon url="mailto:shivam181106@gmail.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://www.linkedin.com/in/shivam-jaiswal-54088a266/" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://twitter.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://instagram.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://youtube.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
        </div>
        <div className='h-40 mt-20 border-l-2 border-zinc-700'></div>
        <div className='w-1/2 h-40 mt-20 bg-gradient-to-r from-[#717568] to-zinc-900'>
        <div className='flex flex-row'>
          <div  className='mx-auto mb-md-0 mb-4 text-zinc-200 pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Useful links</h6>
              <p>
                <a href='/booking' className='font-mono text-zinc-200'>
                  Book Tickets
                </a>
              </p>
              <p>
                <a href='/' className='font-mono text-zinc-200'>
                  Search Trains
                </a>
              </p>
              <p>
                <a href='/' className='font-mono text-zinc-200'>
                  PNR Enquiry
                </a>
              </p>
              <p>
                <a href='/' className='font-mono text-zinc-200'>
                  Help
                </a>
              </p>
            </div>

            <div  className='mx-auto mb-md-0 mb-4 text-white pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Contact</h6>
              <p className='flex flex-row'>
                <HomeIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                New York, NY 10012, US
              </p>
              <p className='flex flex-row'>
              <MailIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                info@example.com
              </p>
              <p className='flex flex-row'>
              <Phone className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 01 234 567 88
              </p>
              <p className='flex flex-row'>
              <TicketCheck className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 01 234 567 88
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center p-4 bg-zinc-300'>
        © 2021 Copyright  :
        <a className='font-medium pl-2' href='https://mdbootstrap.com/'>
          Journeyaura.com
        </a>
      </div>
      <BackgroundBeams className={"h-[950vh]"}/>

    </div>
  )
}
export default Home;
// export default withSplashScreen(Home);
export const products = [
  {
    title: "Easy Ticket Booking",
    link: "/booking",
    thumbnail: img1
  },
  {
    title: "Secure Payment Processing",
    link: "/booking",
    thumbnail: img11
  },
  {
    title: "Real-time Train Tracking",
    link: "/booking",
    thumbnail: img3
  },
  {
    title: "User-Friendly Interface",
    link: "/booking",
    thumbnail: img4
  },
  {
    title: "Customized Booking Options",
    link: "/booking",
    thumbnail: img5
  },
  {
    title: "24/7 Customer Support",
    link: "/booking",
    thumbnail: img6
  },
  {
    title: "Personalized Travel Recommendations",
    link: "/booking",
    thumbnail: img7
  },
  {
    title: "Seamless Integration with Travel Apps",
    link: "/booking",
    thumbnail: img8
  },
  {
    title: "Efficient Seat Selection",
    link: "/booking",
    thumbnail: img9
  },
  {
    title: "Exclusive Discounts and Offers",
    link: "/booking",
    thumbnail: img10
  },
  {
    title: "Easy Ticket Booking",
    link: "/booking",
    thumbnail: img11
  },
  {
    title: "Secure Payment Processing",
    link: "/booking",
    thumbnail: img1
  },
  {
    title: "Real-time Train Tracking",
    link: "/booking",
    thumbnail: img3
  },
  {
    title: "User-Friendly Interface",
    link: "/booking",
    thumbnail: img4
  },
  {
    title: "Customized Booking Options",
    link: "/booking",
    thumbnail: img5
  },
];