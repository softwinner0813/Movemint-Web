"use client";

import DashboardFooter from "@/components/dashboard-layout/footer";
import DashboardHeader from "@/components/dashboard-layout/header";
import Sidebar from "@/components/dashboard-layout/sidebar";
import useBreakpoint from "@/lib/useBreakpoint";
import React, { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import nProgress from "nprogress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePathname, useRouter } from "next/navigation";
import CommonModel from "@/components/dashboard-layout/components/common-model";
import { auth } from '@/services/firebase'
import { useUser } from '@/lib/userContext';
import LoadingScreen from "@/components/ui/loadingScreen";

const DashboardLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLogout, setIsModalOpenLogout] = useState(false);
  const { isAuthenticated, userData } = useUser();

  const downMd = useBreakpoint("md");
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    // Set loading to false when the page has fully loaded
    const handleLoad = () => setIsLoading(false);
    const handleStart = () => nProgress.start();
    const handleStop = () => {
      nProgress.done();
      handleLoad();
    };
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if ( ! isAuthenticated || ! user) {
        // Redirect to login page if no user is logged in
        router.push('/login');
      }
    });

    // Cleanup the listener on unmount

    handleStart();
    handleStop();

    return () => {
      nProgress.done(),
        unsubscribe();
    };
  }, [router, isAuthenticated, userData]);

  const handleMouseEnter = () => {
    if (downMd) return;
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!downMd) {
      setIsExpanded(false);
    }
  };

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleAlertClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    setIsModalOpenLogout(false);
    await auth.signOut();
    // Redirect to login or home page after logout
    router.push("/login");
  };

  const handleCancel = () => {
    setIsModalOpenLogout(false);
  };

  useLayoutEffect(() => {
    setIsExpanded(downMd);
    setOpenSidebar(false);
  }, [downMd]);

  if (isLoading) {
    <LoadingScreen />
  }

  return (
    isAuthenticated && <div className="flex">
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "overflow-x-hidden overflow-y-auto fixed top-0 left-0 z-[999999] bg-background h-full transition-all ease-linear duration-200 px-4 lg:px-6 pb-8 pt-4",
          isExpanded ? "w-64" : "w-20",
          downMd && isExpanded && openSidebar
            ? "translate-x-0"
            : downMd
              ? "-translate-x-full"
              : ""
        )}
      >
        <Sidebar
          isExpanded={isExpanded}
          handleToggleSidebar={handleToggleSidebar}
          setIsModalOpenLogout={setIsModalOpenLogout}
        />
      </aside>
      {downMd && openSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleToggleSidebar}
        />
      )}
      <div
        className={cn(
          "transition-all ease-linear duration-200 w-full",
          downMd && isExpanded ? "ml-0" : isExpanded ? "ml-64" : "ml-20",
          downMd && !isExpanded ? "ml-0" : ""
        )}
      >
        <DashboardHeader handleToggleSidebar={handleToggleSidebar}
          setIsModalOpenLogout={setIsModalOpenLogout}
          userData={userData} />
        {pathname === "/dashboard" && (
          <Alert variant="danger" onClick={handleAlertClick}>
            {/* <AlertTitle>Heads up!</AlertTitle> */}
            <AlertDescription>
              Connect Stripe In Order To Submit Proposals
            </AlertDescription>
          </Alert>
        )}
        <main className="bg-midnight w-full p-6 md:p-11">{children}</main>
        <DashboardFooter />
      </div>
      {isModalOpen && (
        <CommonModel
          setIsModalOpen={setIsModalOpen}
          mainHeading="Warning!"
          subHeading="This is a dialogue message warning the user about the action they’re about to take."
          mainButtonContent="Proceed"
          cancelButtonContent="Cancel"
        />
      )}
      {isModalOpenLogout && (
        <CommonModel
          mainHeading="You’ve been logged out"
          subHeading="You’ve been logged out, please sign back in or return home."
          mainButtonContent="Sign Out"
          cancelButtonContent="Return To Home"
          setIsModalOpen={setIsModalOpenLogout}
          isDanger={false}
          showInputFields={false}
          onConfirm={handleLogout}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
