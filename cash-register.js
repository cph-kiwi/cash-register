// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

// const exactChange = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

const denomination = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  ONEHUNDRED: 100,
};

const values = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

function checkCashRegister(price, cash, cid) {
  let change = [];

  function findValue(cid) {
    return cid.map((item, index) => {
      return {
        nameOfSlot: item[0],
        unitOfSlot: values[index][1],
        countItemsInSlot: Math.round(item[1] / values[index][1]),
        totalValueInSlot: item[1],
      };
    });
  }

  const cashInDrawer = findValue(cid);
  console.log("cash in drawer", cashInDrawer);

  let changeDue = cash - price;
  console.log("Total amount of change to be paid out", changeDue);

  const amountInDraw = [];
  cid.forEach((item) => amountInDraw.push(item[1]));
  let initialValue = 0;
  const totalInDraw = amountInDraw.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  console.log("Total amount of money in the draw", totalInDraw);

  if (totalInDraw < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: change };
  }

  let reversedCid = cid.reverse();
  for (let item of reversedCid) {
    let slot = item[0];
    let totalValueInSlot = item[1];
    if (
      changeDue > denomination[slot] &&
      totalValueInSlot > denomination[slot]
    ) {
      change.push([slot, denomination[slot]]);
      changeDue = changeDue - denomination[slot];
      console.log(slot, changeDue, change);

      if (changeDue === 0) {
        return {
          status: "OPEN",
          change: change,
        };
      }
    }
  }

  console.log({ status: "final change", change: change });
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
