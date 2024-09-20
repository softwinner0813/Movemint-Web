"use client"

import HomePage from "@/components/public";
import MoverPage from "@/components/public/components/MoverPage";
import StepsPage from "@/components/public/components/stepsPage";
import Subscribe from "@/components/public/components/subscribe";
import TestimonialSlider from "@/components/public/components/testimonialSlider";
import PublicFooter from "@/components/public/footer";
import PublicHeader from "@/components/public/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative bg-login">
        <PublicHeader />
        <HomePage />
      </div>
      <StepsPage />
      <MoverPage />
      {/* <Testimonial /> */}
      <TestimonialSlider />
      <Subscribe />
      <PublicFooter />
    </div>
  );
}
