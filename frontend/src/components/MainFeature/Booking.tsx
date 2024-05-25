import { FaLocationArrow } from 'react-icons/fa';
import { VscLocation } from "react-icons/vsc";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from 'date-fns';
import img1 from '../../assets/bg_1.jpg'
import { useEffect, useState } from 'react'
import { BackgroundBeams } from '../ui/background-beams'
import { Label } from "../ui/label";
import { cn } from "@/utils/cn";
import logo from "../../assets/icon.svg"
import { ArrowLeftRightIcon, CalendarIcon,  LogOut, Menu, User2Icon } from 'lucide-react';
import { Button } from '../ui/moving-border';
import { Button as Button1}  from '../ui/button';
import { motion } from 'framer-motion';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Calendar } from '../ui/calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type T1 = {
  value: string
  label: string
}
const Classes:T1[] = [
  {
    value: "all",
    label: "All Classes",
  },
  {
    value: "1a",
    label: "AC First Class (1A)",
  },
  {
    value: "2a",
    label: "AC 2 Tier (2A)",
  },
  {
    value: "3a",
    label: "AC 3 Tier (3A)",
  },
  {
    value: "sleeper",
    label: "Sleeper",
  },
]
const Coaches :T1[]= [
  {
    value: "general",
    label: "General",
  },
  {
    value: "ladies",
    label: "Ladies",
  },
  {
    value: "tatkal",
    label: "Tatkal",
  },
  {
    value: "lowerbirth",
    label: "Lower Berth",
  },
  {
    value: "pwd",
    label: "Person with Disability",
  },
]

const Booking = () => {
  const token=Cookies.get('token');
  const [userDet,setUserDet]=useState(null);
  const navigate=useNavigate();
  const handleProfileClick=()=>{
    navigate('/dashboard')
  }
  const handleLoginClick=()=>{
    navigate('/sign-in')
  }
  const handleLogoutClick=()=>{
    Cookies.remove('token');
    navigate('/')
  }
  const handleSearchClick = () => {
    navigate('train-list',{state:{from:stvalue1,to:stvalue2,date:date,coach:value1,class:value2}});
  }
  const [stationsList, setStationsList] = useState<T1[]>([{
    value: "s1",
    label: "station1",
  },
  {
    value: "s2",
    label: "station2",
  },]);
  const [opens1, setOpens1] = useState(false)
  const [stvalue1, setStValue1] = useState<T1 | null>(null)
  const [opens2, setOpens2] = useState(false)
  const [stvalue2, setStValue2] = useState<T1 | null>(null)
    const [showDiv,setShowDiv]=useState(false);
    const [open1, setOpen1] = useState(false)
    const [value1, setValue1] = useState<T1 | null>(null)
    const [open2, setOpen2] = useState(false)
    const [value2, setValue2] = useState<T1 | null>(null)
    const [date, setDate] = useState<Date>()
    useEffect(() => {  
      axios.get('http://localhost:3000/api/v1/user/me',{headers:{'token':token}})
      .then((res)=>{
        console.log(res);
        if(res.data.success)
          {
            // const userDet_=res.data.data;
            setUserDet(res.data.data);
            // console.log(userDet);
          }
      })
      .catch((err)=>{
        console.log(err);
      });
    axios.get('http://localhost:3000/api/v1/admin/stationdb')
    .then(response => {
      const tmp=[];
      for(let i=0;i<response.data.data.length;i++){
        tmp.push({value: response.data.data[i].stationNumber.toString(), label: response.data.data[i].stationName});
      }
      setStationsList(tmp);
    })
    .catch(error => {
        console.log( error.message );
    });
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
    const swapST = () => {
      const temp = stvalue1;
      setStValue1(stvalue2);
      setStValue2(temp);
    }
    // console.log(Coaches);
  return (
    <div className='overflow-x-hidden'>
    <motion.div className='h-screen w-screen flex flex-col justify-center items-center z-0 top-0 left-0 opacity-60 space-y-10 pb-8'
    onClick={()=>{showDiv?setShowDiv(false):null}}
    initial={{ opacity: 1}}
    animate={{ opacity: showDiv ? 0.6:1}}
    transition={{ duration: 0.5 }}    
    >
        <div className='h-16 w-screen bg-zinc-400 flex flex-row items-center justify-between px-6'>
            <a href='/'><img src={logo} className='h-8 w-8 '/></a>
            <Menu className='border-2 border-zinc-800 rounded h-8 w-8 cursor-pointer z-10' onClick={()=>{setShowDiv(!showDiv)}}/>
        </div>
        <div className='w-full h-full flex flex-row mb-8'>
        <div className='h-full w-1/2 border-2 border-zinc-100 rounded-xl py-4 ml-6 pt-8'>
          <h1 className='text-white text-center font-serif text-3xl'>Book Ticket</h1>
          <div className='flex flex-row justify-center items-center p-2 space-x-4'>
          <div className='flex flex-col space-y-2'>
            <Label className='text-white'>From</Label>
            <Popover open={opens1} onOpenChange={setOpens1}>
              <PopoverTrigger asChild>
              <div className="space-x-2 flex flex-row"><FaLocationArrow color="white" className="mt-2"/>
                <Button1 variant="outline" className="w-[150px] justify-start bg-white hover:bg-white rounded">
                  {stvalue1 ? <>{stvalue1.label}</> : <>From</>}
                </Button1>
              </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white" side="bottom" align="start">
                <Command>
                  <CommandInput placeholder="Choose station..." />
                  <CommandList className="bg-gray-200">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {stationsList.map((station) => (
                        <CommandItem
                          key={station.value}
                          value={station.value}
                          onSelect={(value) => {
                            setStValue1(
                              stationsList.find((priority) => priority.value === value) ||
                                null
                            )
                            setOpens1(false)
                          }}
                        >
                          {station.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            </div>
            <ArrowLeftRightIcon className='h-6 w-6 text-white mt-4 cursor-pointer' onClick={swapST}/>
            <div className='flex flex-col space-y-2'>
            <Label className='text-white'>To</Label>
            <Popover open={opens2} onOpenChange={setOpens2}>
              <PopoverTrigger asChild>
              <div className="space-x-2 flex flex-row"><VscLocation color="white" className="mt-2 h-6 w-6"/>
                <Button1 variant="outline" className="w-[150px] justify-start bg-white hover:bg-white rounded">
                  {stvalue2 ? <>{stvalue2.label}</> : <>To</>}
                </Button1>
              </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white" side="bottom" align="start">
                <Command>
                  <CommandInput placeholder="Choose station..." />
                  <CommandList className="bg-gray-200">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {stationsList.map((station) => (
                        <CommandItem
                          key={station.value}
                          value={station.value}
                          onSelect={(value) => {
                            setStValue2(
                              stationsList.find((priority) => priority.value === value) ||
                                null
                            )
                            setOpens2(false)
                          }}
                        >
                          {station.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            </div>
          </div>
          <div className='flex flex-row justify-center items-center p-4 space-x-4'>
          <div className='flex flex-col space-y-2'>
            <Label className='text-white'>Coaches</Label>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button1 variant="outline" className="w-[150px] justify-start bg-white hover:bg-white rounded">
                  {value2 ? <>{value2.label}</> : <>Classes</>}
                </Button1>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white" side="bottom" align="start">
                <Command>
                  <CommandInput placeholder="Change coach..." />
                  <CommandList className="bg-gray-200">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {Classes.map((classe) => (
                        <CommandItem
                          key={classe.value}
                          value={classe.value}
                          onSelect={(value) => {
                            setValue2(
                              Classes.find((priority) => priority.value === value) ||
                                null
                            )
                            setOpen2(false)
                          }}
                        >
                          {classe.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            </div>
            <div className='flex flex-col space-y-2'>
            <Label className='text-white'>Coaches</Label>
            <Popover open={open1} onOpenChange={setOpen1}>
              <PopoverTrigger asChild>
                <Button1 variant="outline" className="w-[150px] justify-start bg-white hover:bg-white rounded">
                  {value1 ? <>{value1.label}</> : <>Coaches</>}
                </Button1>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white" side="bottom" align="start">
                <Command>
                  <CommandInput placeholder="Change coach..." />
                  <CommandList className="bg-gray-200">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {Coaches.map((coach) => (
                        <CommandItem
                          key={coach.value}
                          value={coach.value}
                          onSelect={(value) => {
                            setValue1(
                              Coaches.find((priority) => priority.value === value) ||
                                null
                            )
                            setOpen1(false)
                          }}
                        >
                          {coach.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            </div>
            <div className='flex flex-col space-y-2'>
            <Label className='text-white'>Date</Label>
            <Popover>
            <PopoverTrigger asChild>
              <Button1
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-white hover:bg-white",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button1>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-white"
              />
            </PopoverContent>
            </Popover>
            </div>
          </div>
          <div className='flex flex-row justify-between items-center p-4 space-x-4'>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Person With Disability Concession</Label></div>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Flexible With Date</Label></div>
          </div>
          <div className='flex flex-row justify-between items-center p-4 space-x-4'>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Train with Available Berth</Label></div>
            <div className='space-x-4'><Checkbox className='text-white border-white'/><Label className='text-white'>Railway Pass Concession</Label></div>
          </div>
          <div className='w-full flex justify-center pt-4'><Button1 className='bg-blue-600 rounded-xl hover:bg-blue-500 w-40 font-serif text-lg items-center justify-center' onClick={handleSearchClick}>Search</Button1></div>

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
        {userDet?<div onClick={handleProfileClick}><Button className='bg-[#bdfbc] font-serif text-white border border-zinc-700 cursor-pointer'>My Profile</Button></div>:<div onClick={handleLoginClick}><Button className='bg-[#bdfbc] font-serif text-white border border-zinc-700 cursor-pointer'>Login</Button></div>}
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
      {userDet?<div className='flex flex-row items-center justify-center p-2'><Button1 className='bg-blue-600 rounded-xl hover:bg-blue-500 w-40 ' onClick={handleLogoutClick}><LogOut className='mr-2'/><h1 className='font-serif text-lg '>Logout</h1></Button1></div>:<></>}
    </motion.div>
      <BackgroundBeams />
    </div>

  )
}

export default Booking;

