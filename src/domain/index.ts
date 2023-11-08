import type { Address } from "@summer-sdk/types/address";
import type BigNumber from "bignumber.js";

interface Message<Name extends string, Data extends {}> {
  name: Name;
  data?: Data;
}

export interface Swap {
  fromTokenAddress: Address;
  toTokenAddress: Address;
  fromTokenAmount: BigNumber;
  toTokenAmount: BigNumber;
  minToTokenAmount: BigNumber;
  exchangeCalldata: string;
  collectFeeFrom: Address;
  fee: BigNumber;
}

export type Tx = {
  to: Address;
  data: string;
  value: string;
};

export interface Strategy<
  P extends LendingPosition<Protocol>,
  Errors extends Message<string, {}>[],
  Warrnings extends Message<string, {}>[],
  Notices extends Message<string, {}>[],
  Successes extends Message<string, {}>[]
> {
  simulation: {
    errors: Errors;
    warnings: Warrnings;
    notices: Notices;
    successes: Successes;
    swaps: Swap[];
    position: P;
    // we need some kind of place where we will calculate fees,
    // like our fees, origination fees etc,
    // maybe it might be usefull to have diff, like debtDelta etc
    // think where and how we should calculate potencial earnings
    // sometimes we need those earniongs before even user inputs anything
    // maybe simulationton could have
  };
  tx: Tx;
}
