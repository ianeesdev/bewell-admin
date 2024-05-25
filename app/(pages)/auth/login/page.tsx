"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import InputField from "@/components/InputField";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:5012/admin/auth/login`,
        payload
      );

      if (response.data.isLoggedIn) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
      alert("Invalid Credentials. Try Again!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-[#FAFAFA] h-screen w-full flex items-center justify-center">
      <div className="bg-white w-[500px] h-[500px] flex flex-col items-center justify-center p-5 rounded-md">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            width={150}
            height={150}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <h1 className="text-[1.5rem] font-semibold text-deepAqua">
            Admin Panel
          </h1>
        </div>
        <div className="w-[90%]">
          <form onSubmit={handleSubmit}>
            <InputField
              type={"email"}
              label={"Email Address"}
              placeholder={"abc@bewell.com"}
              name={"email"}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <InputField
              type={"password"}
              label={"Password"}
              placeholder={"*******"}
              name={"password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-md bg-primary text-white w-full mx-auto p-3 mt-5 text-lg font-medium"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
