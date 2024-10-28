import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Input = React.forwardRef(
  (
    {
      className,
      type,
      icon: Icon,
      imageLogo: ImageLogo,
      id,
      label,
      labelClassName,
      defaultValue,
      value,
      deleteIcon: DeleteIcon,
      deleteExtraDestinationFiled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex-1">
        {Icon && (
          <div className="absolute inset-y-auto top-6 left-0 flex items-center pl-2 pointer-events-none">
            <Icon
              className="w-5 h-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
        {ImageLogo && (
          <div className="absolute inset-y-auto top-[26px] left-0.5 flex items-center pl-2 pointer-events-none">
            <Image
              src={ImageLogo}
              alt="truck logo"
              height={16}
              width={20}
              className="w-5 h-4 text-muted-foreground mix-blend-lighten"
              aria-hidden="true"
            />
          </div>
        )}
        {type === "textarea" ? (<textarea
          id={id}
          className={cn(
            "flex w-full rounded-lg border border-input bg-transparent  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 mb-2",
            className,
            label ? "pb-2 pt-6 px-10" : "py-2 px-3"
          )}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />) : (<input
          type={type}
          id={id}
          className={cn(
            "flex w-full rounded-lg border border-input bg-transparent  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 mb-2",
            className,
            label ? "pb-2 pt-6 px-10" : "py-2 px-3"
          )}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />)}
        {label && (
          <label
            htmlFor={id}
            className={`absolute duration-300 transform peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-[50%] z-10 origin-[0] ${
              Icon ? "peer-placeholder-shown:px-10" : "px-2"
            } py-3.5 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 top-2 text-xs -translate-y-4 rtl:translate-x-1/4 rtl:left-auto start-1 -translate-x-[3px] text-[#848484] peer-placeholder-shown:text-[16px] font-semibold select-none ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {DeleteIcon && (
          <div
            className="bg-danger w-fit rounded-full cursor-pointer absolute top-4 right-5 "
            onClick={deleteExtraDestinationFiled}
          >
            {<DeleteIcon />}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
