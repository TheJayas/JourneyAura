import img1 from '../../assets/bg_1.jpg'
import React, { useEffect, useState } from 'react'
import { BackgroundBeams } from '../ui/background-beams'
import { Input } from '../ui/input'
import { Label } from "../ui/label";
import { cn } from "@/utils/cn";
import logo from "../../assets/icon.svg"
import { LogOut, LucideArrowRightLeft, Menu, User2Icon } from 'lucide-react';
import { Button } from '../ui/moving-border';
import { Button as Button1}  from '../ui/button';
import { motion } from 'framer-motion';
import { Checkbox } from '../ui/checkbox';
const Booking = () => {
    const [showDiv,setShowDiv]=useState(false);
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setShowDiv(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    // console.log(showDiv);
  return (
    <div className='overflow-x-hidden'>
    <motion.div className='h-screen w-screen flex flex-col justify-center items-center z-0 top-0 left-0 opacity-60 space-y-10'
    onClick={()=>{showDiv?setShowDiv(false):null}}
    initial={{ opacity: 1}}
    animate={{ opacity: showDiv ? 0.6:1}}
    transition={{ duration: 0.5 }}    
    >
        <div className='h-16 w-screen bg-zinc-400 flex flex-row items-center justify-between px-6'>
            <a href='/'><img src={logo} className='h-8 w-8 '/></a>
            <Menu className='border-2 border-zinc-800 rounded h-8 w-8 cursor-pointer z-10' onClick={()=>{setShowDiv(!showDiv)}}/>
        </div>
        <div className='w-full h-full flex flex-row'>

        <div className='h-full w-1/2 border-2 border-zinc-100 rounded-xl pt-6 ml-6'>
          <h1 className='text-white text-center font-serif text-3xl'>Book Ticket</h1>
          <div className='flex flex-row justify-center items-center p-4 space-x-4'>
            <LabelInputContainer className='w-1/2'>
              <Label className='text-white'>From</Label>
              <Input className='w-full rounded'/>
            </LabelInputContainer>
            <LucideArrowRightLeft className='w-8 h-8 mt-4' color='white '/>
            <LabelInputContainer className='w-1/2'>
              <Label className='text-white'>To</Label>
              <Input className='w-full rounded'/>
            </LabelInputContainer>
          </div>
          <div className='flex flex-row justify-center items-center p-4 space-x-4'>
            <LabelInputContainer className='w-1/3'>
              <Label className='text-white'>Date</Label>
              <Input className='w-full rounded'/>
            </LabelInputContainer>
            <LabelInputContainer className='w-1/3'>
              <Label className='text-white'>Class</Label>
              <Input className='w-full rounded'/>
            </LabelInputContainer>
            <LabelInputContainer className='w-1/3'>
              <Label className='text-white'>General</Label>
              <Input className='w-full rounded'/>
            </LabelInputContainer>
          </div>
          <div className='flex flex-row justify-between items-center p-4 space-x-4'>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Person With Disability Concession</Label></div>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Flexible With Date</Label></div>
          </div>
          <div className='flex flex-row justify-between items-center p-4 space-x-4'>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Train with Available Berth</Label></div>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Railway Pass Concession</Label></div>
          </div>
          <div className='w-full flex justify-center pt-4'><Button1 className='bg-blue-600 rounded-xl hover:bg-blue-500 w-40 font-serif text-lg items-center justify-center'>Search</Button1></div>

        </div>
        <motion.div id="imgEl" className="h-full w-1/2 flex justify-center items-center pt-4 px-8"
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
        </div>
    </motion.div>
    <motion.div className='h-screen w-1/4 bg-white z-10 top-0 right-0 fixed flex flex-col ' 
    initial={{ opacity: 0, left: screen.width }}
    animate={{ opacity: showDiv ? 1 : 0, left: showDiv ? screen.width*3/4:screen.width }}
    transition={{ duration: 0.5 }}
    >
      <div className='flex flex-row w-full bg-zinc-800 h-24 p-2 items-center'>
        <User2Icon className='h-8 w-8 m-6' color='white'/>
        <Button className='bg-[#bdfbc] font-serif text-white border border-zinc-700'>My Profile</Button>
      </div>
      <div className='flex flex-row items-center justify-center p-3'><Button1 className='bg-blue-600 rounded-xl hover:bg-blue-500 w-40 font-serif text-lg'>Home Page</Button1></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline text-blue-500 underline'>Book Tickets</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline'>Search Trains</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline'>Search Stations</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline'>PNR Enquiry</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline'>Passenger List</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-start p-2'><a href='/' className='pl-2 w-40 font-serif text-lg hover:underline'>Change Password</a></div>
      <div className='h-2 border-t-2 border-zinc-200 mt-1'></div>
      <div className='flex flex-row items-center justify-center p-2'><Button1 className='bg-blue-600 rounded-xl hover:bg-blue-500 w-40 '><LogOut className='mr-2'/><h1 className='font-serif text-lg '>Logout</h1></Button1></div>
    </motion.div>
      <BackgroundBeams />
    </div>

  )
}

export default Booking;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
