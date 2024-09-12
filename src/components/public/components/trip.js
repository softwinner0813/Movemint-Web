import LeafIcon from "@/components/icons/leaf-icon";
import SendIcon from "@/components/icons/send-icon";
import ProgressImage from "../../../../public/images/progress-img.png";
import Image from "next/image";
import Progress from "@/components/ui/progress";
import MapTwoIcon from "@/components/icons/mapTwo-icon";

const icons = [
  <LeafIcon key={1} />,
  <MapTwoIcon key={2} />,
  <SendIcon key={3} />,
];

const Trip = () => {
  return (
    <div className="relative">
      <div className="bg-[#191A1F] min-w-[350px] sm:min-w-[493px] max-w-[493px] rounded-[35px] py-[27px] px-8">
        <Image
          src={'/images/miami.jpg'}
          alt="miami"
          width={427}
          height={215}
          className="w-[427px] h-[215px] object-cover rounded-[32px] mb-[35px]"
        />

        <h3 className="font-medium text-2xl leading-[124.5%] text-white mb-4">
          Move to Miami
        </h3>

        <p className="font-medium text-[22px] text-white">
          14-29 June | by Robbin joseph
        </p>

        <div className="flex items-center gap-4 mt-7">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] w-12 h-12 flex items-center justify-center rounded-full"
            >
              {icon}
            </div>
          ))}
        </div>

        {/* <div className="mt-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <BuildingIcon />
            <span className="text-[#84829A] font-medium text-[22px]">
              Atlas Van Lines
            </span>
          </div>

          <button>
            <HeartIcon />
          </button>
        </div> */}
      </div>

      {/* Status */}
      <div
        className="bg-[#191A1F] rounded-[24px] py-[22px] px-[20px] w-[350px] absolute bottom-[10.9%] 4xl:-right-[31.7%] -right-16 hidden sm:block"
        style={{ boxShadow: "0px 133.01px 106.41px 0px rgba(0, 0, 0, 0.02)" }}
      >
        <div className="flex items-center gap-4">
          <Image
            src={ProgressImage}
            alt=""
            width={66}
            height={66}
            className="w-[66px] h-[66px] rounded-full object-cover"
          />

          <div>
            <p className="text-[#84829A] font-medium mb-2">In Progress</p>
            <p className="text-white font-medium text-2xl">In Transit</p>

            <div className="mt-[18px]">
              <p className="font-medium text-lg text-white">
                <span className="text-primary">40%</span> completed
              </p>

              <div className="mt-3 ml-[3px]">
                <Progress percentage={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
