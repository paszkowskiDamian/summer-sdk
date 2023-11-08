import {} from "@summer-sdk/";

// example of general math for position
export function getLtv(position: LendingPosition<Protocol>): BigNumber {
  const debtValue = normaliseAmount(position.debtAmount).times(
    normaliseAmount(position.protocolData.debtPrice)
  );
  const collateralValue = normaliseAmount(position.collateralAmount).times(
    normaliseAmount(position.protocolData.collateralPrice)
  );

  return debtValue.div(collateralValue);
}
