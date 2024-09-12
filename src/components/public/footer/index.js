import React from "react";
import Image from "next/image";
import FacebookIcon from "../../icons/facebook-icon";
import InstagramIcon from "../../icons/instagram-icon";
import GooglePlayImg from "../../../../public/images/google-play.png";
import PlayStoreImg from "../../../../public/images/play-store.png";
import TikTokIcon from "../../icons/twitter-icon";
import Logo from "../../../../public/images/logo/logo.png";

const FooterSection = ({ title, links }) => (
  <div className="space-y-4 xl:space-y-10 flex flex-col items-center sm:items-start">
    <h5 className="font-bold text-lg xl:text-[28px] text-branded-blue">
      {title}
    </h5>
    <ul className="space-y-2 xl:space-y-4 flex flex-col items-center sm:items-start">
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
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Refund Policy" },
];

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container text-white py-8 mt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
          <section className="lg:mb-0 text-center lg:text-left">
            <Image
              src={Logo}
              alt="Movemint Logo"
              width={285}
              height={40}
              className="w-36 mx-auto lg:mx-0 lg:w-48 xl:w-72 mb-2"
            />
            <p className="text-base xl:text-lg">
              Finding Movers Just Got Easier. Snap It. <br /> Book It. Movemint.
            </p>
          </section>

          <nav
            aria-label="Footer Navigation"
            className="
    flex flex-col sm:flex-row justify-between items-center gap-6 
    md:flex-row md:space-x-6 md:space-y-0
    lg:space-x-8
    xl:space-x-24
  "
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
        <div className="mt-24 text-center text-white text-lg">
          &copy; {currentYear} All rights reserved, Movemint App Inc
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
