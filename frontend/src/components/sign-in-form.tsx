import Cookies from 'js-cookie';
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export function SigninForm() {

  const navigate=useNavigate();
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [captcha, setCaptcha] = React.useState<string>("");
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading(
      "Verifying User, Please Wait...",
    );
    if(password!==confirmPassword){toast.error("Passwords do not match", { id: toastId });}
    const data={'name':username,'email':email,'password':password};
    try {
      await axios.post("http://localhost:3000/api/v1/user/login", data)
      .then((res) => {
        console.log(res);
        if(res.data.success){
          toast.success("Login Successful", { id: toastId });
          const token = res.data.token;
          Cookies.set('token', token, { expires: 7, secure: true });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }else{
          toast.error("No User exist with this email", { id: toastId });
        }
      })
      .catch((err) => {console.log(err); toast.error("Error Registering", { id: toastId });});
    } catch (err) {
      toast.error("Error Registering", { id: toastId });
    }
    console.log("Form submitted");
  };
  return (
    <div className="h-full w-full pb-4 overflow-x-hidden bg-black my-auto flex flex-col justify-center">
    <div className="flex flex-col">
      <div className="h-4"></div>
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-900 border">
      <h2 className="font-bold text-xl text-neutral-200 text-center">
        Welcome to Journey Aura
      </h2>
      <p className="max-w-sm mt-2 text-neutral-300 text-center">
        Login To Your Account
      </p>

      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name" className="text-white">Username</Label>
          <Input 
          id="name" 
          placeholder="username" 
          type="text" 
          className="rounded-xl"
          required
          onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input 
          id="email" 
          placeholder="email@gmail.com" 
          type="email" 
          className="rounded-xl"
          required
          onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input 
          id="password" 
          placeholder="••••••••" 
          type="password" 
          className="rounded-xl"
          required
          onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword" className="text-white">Confirm password</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            type="password"
            className="rounded-xl"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>
        <div className="pb-4 relative"><ReCAPTCHA sitekey="6Ldb27UpAAAAAAHBHAPEVKlq1FM3zlQdo1i6iD-O" onChange={(val)=>{setCaptcha(val || "")}}></ReCAPTCHA></div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] rounded-xl disabled:opacity-50"
          type="submit"
          disabled={captcha===""}
        >
          Login &rarr;
          <BottomGradient />
        </button>
        <div className="w-full justify-center items-center flex flex-row">
          <div className="pr-4 items-center pt-4 font-mono text-zinc-200 text-lg">New User </div>
          <button
            className="relative w-2/5 group/btn bg-blue-700 text-white h-8 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] rounded-xl mt-4"
            type="submit"
            onClick={()=>{navigate('/sign-up')}}
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
    <Toaster className="bg-white" />
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
