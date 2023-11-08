import { BigNumber } from "bignumber.js";
import type { Address } from "@summer-sdk/types/address";
import {
  AmmountWei,
  normaliseAmount,
  timesWei
} from "@summer-sdk/types/AmountWei";

/* When implementing new protocol:

- Add name to Protocol enum
- Implement protocolDataResolver 

*/

export enum Protocol {
  MAKER = "MAKER",
  AAVE_2 = "AAVE_v2",
  AAVE_3 = "AAVE_v3",
  AJNA = "AJNA",
  MORPHO_BLUE = "MORPHO_BLUE"
}

export interface ProtocolToSpecificData {
  [Protocol.MAKER]: { liquidationPenalty: AmmountWei };
  [Protocol.AAVE_2]: {};
  [Protocol.AAVE_3]: {};
  [Protocol.AJNA]: {};
  [Protocol.MORPHO_BLUE]: { test: string };
}

export interface ProtocolData<P extends Protocol> {
  chainId: number;
  protocol: P;
  debtToken: Address;
  collateralToken: Address;
  maxLtv: AmmountWei;
  minDebt: AmmountWei;
  maxDebt: AmmountWei;
  minCollateral: AmmountWei;
  maxCollateral: AmmountWei;
  availableLiquidity: AmmountWei;
  protocolBaseCurrency: Address;
  rate: AmmountWei;
  // Prices are denominated in protocol bace token e.g. aaveV2 -> eth, maker -> dai
  debtPrice: AmmountWei;
  collateralPrice: AmmountWei;
  protocolSpecificData: ProtocolToSpecificData[P];
}

export interface ProtocolDataResolver<P extends Protocol> {
  (): Promise<ProtocolData<P>>;
}

export interface LendingPosition<P extends Protocol> {
  protocolData: ProtocolData<P>;
  debtAmount: AmmountWei;
  collateralAmount: AmmountWei;
}

export interface LendingPositionResolver<P extends Protocol> {
  (): Promise<LendingPosition<P>>;
}

// example of specific math for position
// propably we need some kind of mapping from protocol to specific protocol data
export function getLiqudationPenalty(
  position: LendingPosition<Protocol.MAKER>
): AmmountWei {
  // this is just an example how can we handle specific protocol params
  return timesWei(
    position.debtAmount,
    position.protocolData.protocolSpecificData.liquidationPenalty
  );
}

/*

structure 

     Current structure 

  ----- Hidden part -----
         actions
            | 
        operations
  --------  | ------
        strategies


new idea:

const sdk = makeSdk(HUGE_ADDRESSES_TOKENS_CONFIG)

sdk.<protocol>.getPosition(dpmAddress: Address): Position<Protocol>


*/
