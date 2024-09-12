"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/images/logo/logo.png";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PublicHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("overflow-hidden", !isSidebarOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`container transition duration-300 ${
          isScrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between py-4 md:py-6 lg:py-6 xl:py-8 gap-4">
          <Link href="/" className=" transition-colors">
            <Image
              src={Logo}
              alt="Movemint Logo"
              width={285}
              height={40}
              className="w-36 lg:w-48 xl:w-72"
            />
            {/* <p className="text-[10px] ml-7 lg:ml-8 xl:ml-14">
              Finding Movers Just Got Easier. <br className="xl:hidden" />Snap It. Book It. Movemint.
            </p> */}
          </Link>
          <nav className="hidden lg:block space-x-7 lg:space-x-10 xl:space-x-16 text-white">
            <Link href="/" className=" transition-colors">
              Home
            </Link>
            <Link href="/" className=" transition-colors">
              About
            </Link>
            <Link href="/dashboard" className=" transition-colors">
              Dashboard
            </Link>
            <Link href="/blog" className=" transition-colors">
              Blog
            </Link>
            <Link href="/contact" className=" transition-colors">
              Contact Us
            </Link>
          </nav>
          <div className="hidden lg:flex space-x-4">
            <Link href="/signup">
              <Button
                variant="outline"
                type="button"
                size="lg"
                className="rounded-md"
              >
                Sign up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="destructive"
                type="button"
                className="shadow-[0_4px_4px_0_#00000040] rounded-md"
                size="lg"
              >
                Login
              </Button>
            </Link>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleSidebar}>
              <Menu className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed z-[9999] top-0 left-0 h-full w-64 bg-black text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex items-center justify-between">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={toggleSidebar}>
            <X className="text-white" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link href="/">
            <span onClick={toggleSidebar}>Home</span>
          </Link>
          <Link href="/onboarding">
            <span onClick={toggleSidebar}>About</span>
          </Link>
          <Link href="/dashboard">
            <span onClick={toggleSidebar}>Dashboard</span>
          </Link>
          <Link href="/contact">
            <span onClick={toggleSidebar}>Contact Us</span>
          </Link>
          <Link href="/signup">
            <span onClick={toggleSidebar}>Sign up</span>
          </Link>
          <Link href="/login">
            <span onClick={toggleSidebar}>Login</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default PublicHeader;
