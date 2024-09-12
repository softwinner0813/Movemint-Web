import React from "react";

const BellIcon = ({ noBell }) => {
  if (noBell) {
    return (
      <svg
        width="19"
        height="14"
        viewBox="0 0 19 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.69436 0C6.40139 0 4.4751 1.72411 4.22188 4.00306L3.5 10.5H1.5C0.671573 10.5 0 11.1716 0 12V12.5C0 13.3284 0.671572 14 1.5 14H17.1667C17.9951 14 18.6667 13.3284 18.6667 12.5V12C18.6667 11.1716 17.9951 10.5 17.1667 10.5H15.1667L14.4448 4.00306C14.1916 1.72411 12.2653 0 9.97231 0H8.69436Z"
          fill="#4E4E4E"
        />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0277 0C7.73472 0 5.80843 1.72411 5.55522 4.00306L4.5 13.5H1.5C0.671573 13.5 0 14.1716 0 15V16.5C0 17.3284 0.671573 18 1.5 18H22.5C23.3284 18 24 17.3284 24 16.5V15C24 14.1716 23.3284 13.5 22.5 13.5H19.5L18.4448 4.00306C18.1916 1.72411 16.2653 0 13.9723 0H10.0277Z"
        fill="white"
      />
      <rect
        opacity="0.3"
        x="9"
        y="19.5"
        width="6"
        height="6"
        rx="2.25"
        fill="white"
      />
    </svg>
  );
};

export default BellIcon;
