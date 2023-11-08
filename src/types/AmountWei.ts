export type AmmountWei = { value: bigint; precision: number };

export function ammountWeiFromString(
  stringValue: string | number | bigint,
  precision: number = 18
): AmmountWei {
  return { value: BigInt(stringValue), precision };
}

export function addWei(a: AmmountWei, b: AmmountWei) {
  if (a.precision === b.precision) {
    return {
      value: a.value + b.value,
      precision: a.precision
    };
  }
  throw new Error(`Not implemented 'addWei' for different precisions`);
  // TODO resolve cases when precisions are not equal
}

export function minusWei(a: AmmountWei, b: AmmountWei) {
  if (a.precision === b.precision) {
    return {
      value: a.value - b.value,
      precision: a.precision
    };
  }
  throw new Error(`Not implemented 'minusWei' for different precisions`);
  // TODO resolve cases when precisions are not equal
}

export function timesWei(a: AmmountWei, b: AmmountWei) {
  if (a.precision === b.precision) {
    return {
      value: a.value * b.value,
      precision: a.precision
    };
  }
  throw new Error(`Not implemented 'timesWei' for different precisions`);
  // TODO resolve cases when precisions are not equal
}

export function divWei(a: AmmountWei, b: AmmountWei) {
  if (a.precision === b.precision) {
    return {
      value: a.value / b.value,
      precision: a.precision
    };
  }
  // TODO resolve cases when precisions are not equal
}

export function normaliseAmount(wei: AmmountWei): string {
  return wei.value.toString().padEnd(wei.precision, "0");
}
