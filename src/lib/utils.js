import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getName(firstName, lastName) {
  let name = "";
  if (firstName) {
    name = firstName;
    if (lastName) {
      name += " " + lastName;
    }
  } else if (lastName) {
    name = lastName;
  } else {
    name = "Unknown";
  }
  return name;
}