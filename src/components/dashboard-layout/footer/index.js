import React from "react";
import Image from "next/image";
import FacebookIcon from "../../icons/facebook-icon";
import InstagramIcon from "../../icons/instagram-icon";
import GooglePlayImg from "../../../../public/images/google-play.png";
import PlayStoreImg from "../../../../public/images/play-store.png";
import TikTokIcon from "../../icons/twitter-icon";

const FooterSection = ({ title, links }) => (
  <div className="space-y-4 xl:space-y-10">
    <h5 className="font-bold text-lg xl:text-[28px] text-branded-blue text-blue-800">
      {title}
    </h5>
    <ul className="space-y-2 xl:space-y-4">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-white xl:text-xl hover:text-branded-blue"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialMediaLink = ({ href, label, icon, className }) => (
  <a
    href={href}
    aria-label={label}
    className={`${className} h-10 w-10 xl:h-14 xl:w-14 rounded-full bg-white flex items-center justify-center`}
  >
    {icon}
  </a>
);

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Mobile" },
];

const contactLinks = [
  { href: "#", label: "Help/FAQ" },
  { href: "#", label: "Press" },
  { href: "#", label: "Affiliates" },
];

const moreLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/aup", label: "Acceptable Policy" },
];

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-foreground bg-midnight py-8">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row lg:justify-evenly  space-y-10 lg:space-y-0">
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-3 md:gap-20 lg:gap-24"
          >
            <FooterSection title="Company" links={companyLinks} />
            <FooterSection title="Contact" links={contactLinks} />
            <FooterSection title="More" links={moreLinks} />
          </nav>

          <section className="mt-6 lg:mt-0 flex flex-col space-y-10">
            <div className="flex space-x-8 justify-center lg:justify-normal">
              <SocialMediaLink
                href="#"
                label="Facebook"
                icon={<FacebookIcon />}
              />
              <SocialMediaLink
                href="#"
                label="Instagram"
                icon={<InstagramIcon />}
              />
              <SocialMediaLink href="#" label="Twitter" icon={<TikTokIcon />} />
            </div>

            <section className="flex flex-col space-y-6">
              <p className="text-xl lg:text-2xl xl:text-3xl font-medium text-center lg:text-left">
                Download our app
              </p>
              <div className="flex space-x-4 justify-center lg:justify-start">
                <Image
                  src={GooglePlayImg}
                  alt="Google Play"
                  width={142}
                  height={46}
                />
                <Image
                  src={PlayStoreImg}
                  alt="Play Store"
                  width={142}
                  height={46}
                />
              </div>
            </section>
          </section>
        </div>
        <div className="mt-10 text-left text-white text-lg">
          &copy; {currentYear} All rights reserved, Movemint App Inc
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
