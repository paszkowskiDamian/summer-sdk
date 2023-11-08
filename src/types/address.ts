import { ethers } from "ethers";

export type Address = string & { _address: never };

export function isAddress(candidate: string): candidate is Address {
  return ethers.isAddress(candidate);
}

export function toAddress(candidate: string): Address {
  if (!isAddress(candidate)) {
    throw new Error(`${candidate} is not an Address`);
  }

  return candidate;
}
