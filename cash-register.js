// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

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

// creates array of objects listing what is in the cash drawer
function createCashDrawerSlots(cid) {
  return cid.map((item, index) => {
    return {
      nameOfSlot: item[0],
      unitOfSlot: values[index][1],
      countItemsInSlot: Math.round(item[1] / values[index][1]),
      totalValueInSlot: item[1],
    };
  });
}

// Work out total amount in drawer
function findTotalInDrawer(cid) {
  const amountInDrawer = [];
  cid.forEach((item) => amountInDrawer.push(item[1]));
  let initialValue = 0;
  return amountInDrawer.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
}

function checkCashRegister(price, cash, cid) {
  let change = [];

  const cashInDrawer = createCashDrawerSlots(cid);
  // console.log("cash in drawer", cashInDrawer);

  // How much change should be given?
  let totalChange = cash - price;
  // console.log(
  //   "Total amount of change to be paid out",
  //   totalChange
  // );

  const totalInDrawer = Math.round(findTotalInDrawer(cid));
  // console.log(
  //   "Total amount of money in the drawer",
  //   totalInDrawer
  // );

  // If total amount in drawer is less than the change owed, then it's an automatic out
  if (totalInDrawer < totalChange) {
    return console.log({ status: "INSUFFICIENT_FUNDS", change: change });
  }

  // Reverse the cash in drawer array of objects so that it is easier to loop through from highest to lowest.
  let reversedCashInDrawer = cashInDrawer.reverse();
  // console.log("Reversed cash in drawer", reversedCashInDrawer);

  // Write function to loop through cash in drawer to remove required change and push change into change array
  function makeChange(changeDue, drawer) {
    if (changeDue === 0 && totalInDrawer > totalChange) {
      return console.log({ status: "OPEN", change: change });
    } else if (changeDue === 0 && totalInDrawer === totalChange) {
      return console.log({ status: "CLOSED", change: change });
    } else {
      const index = drawer.findIndex(
        (slot) => changeDue >= slot.unitOfSlot && slot.countItemsInSlot > 0
      );

      const highestSlot = drawer[index];
      // console.log("highest unit", index, highestSlot);

      // need to check if highestSlot already exists in change array, then add one unit to already exitsing count
      const alreadyExistsInChange = (slot) =>
        slot.nameOfSlot === highestSlot.nameOfSlot;

      if (change.some(alreadyExistsInChange)) {
        const changeIndex = change.findIndex(
          (changeSlot) => changeSlot.nameOfSlot === highestSlot.nameOfSlot
        );
        change[changeIndex] = [
          `${change[changeIndex][0]}`,
          Number(`${change[changeIndex][1]}`) +
            Number(`${highestSlot.unitOfSlot}`),
        ];
      } else {
        change.push([
          `${highestSlot.nameOfSlot}`,
          Number(`${highestSlot.unitOfSlot}`),
        ]);
      }
      // console.log("change", change);
      Number(drawer[index].countItemsInSlot) - 1;
      Number(drawer[index].totalValueInSlot) - Number(drawer[index].unitOfSlot);
      makeChange(changeDue - Number(highestSlot.unitOfSlot), drawer);
    }
  }
  makeChange(totalChange, reversedCashInDrawer);

  // console.log({ status: "final change", change: change });
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
