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

export function getMake(vehicles) {
  const data = JSON.parse(vehicles)[0];
  return data.make;
}

export function getModel(vehicles) {
  const data = JSON.parse(vehicles)[0];
  return data.model;
}

export function isVehicle(vehicles) {
  const data = JSON.parse(vehicles)[0];
  if (data.make == "")
    return "No";
  return "Yes";
}