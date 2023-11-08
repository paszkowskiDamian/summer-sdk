import {
  ProtocolDataResolver,
  Protocol,
  toAddress,
  ammountWeiFromString,
  ProtocolData
} from "@summer-sdk/common";
import { ethers } from "ethers";

interface Dependencies {
  chainId: number;
  provider: ethers.Provider;
}

type MorphoBlueProtocolData = ProtocolData<Protocol.MORPHO_BLUE>;

export function protocolDataResolverFactory(
  dependencies: Dependencies,
  provider: ethers.Provider
): ProtocolDataResolver<Protocol> {
  return async function () {
    return {
      chainId: dependencies.chainId,
      protocol: Protocol.MORPHO_BLUE,
      debtToken: toAddress("0x"),
      collateralToken: toAddress("0x"),
      maxLtv: ammountWeiFromString(10, 1),
      minDebt: ammountWeiFromString(0, 1),
      maxDebt: ammountWeiFromString(Number.MAX_SAFE_INTEGER),
      minCollateral: ammountWeiFromString(0, 1),
      maxCollateral: ammountWeiFromString(Number.MAX_SAFE_INTEGER),
      availableLiquidity: ammountWeiFromString(12345, 1),
      protocolBaseCurrency: toAddress("0x"),
      debtPrice: ammountWeiFromString(1000, 1),
      collateralPrice: ammountWeiFromString(1000, 1),
      rate: ammountWeiFromString(10, 1),
      protocolSpecificData: {}
    };
  };
}
