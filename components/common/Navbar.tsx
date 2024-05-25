import Link from "next/link";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { CgLogOut } from "react-icons/cg";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const menus = [
    { title: "Therapist Applications", path: "/" },
    { title: "Reported Content", path: "/reports" },
    { title: "Resource Panel", path: "/resources" },
  ];

  const pathname = usePathname();

  const onLogout = () => {
    localStorage.removeItem("token")
    router.push("/auth/login");
  };

  return (
    <div className="bg-lilacWhite w-full flex justify-between items-center p-8 rounded-md">
      <Image src="/logo.png" width={120} height={120} alt="logo" />

      <div className="flex gap-10">
        {menus.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`text-lg ${
              pathname === menu.path
                ? "text-deepAqua font-semibold"
                : "text-faded"
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>

      <div
        className="flex gap-4 items-center bg-aqua p-4 rounded-full cursor-pointer"
        onClick={onLogout}
      >
        {/* <p className="text-lg text-black font-medium">Anees</p> */}
        <CgLogOut size={26} className="text-deepAqua" />
      </div>
    </div>
  );
};

export default Navbar;
