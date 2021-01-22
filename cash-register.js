// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

// const exactChange = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

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

  // creates array of objects listing what is in the cash drawer
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
  // console.log("cash in drawer", cashInDrawer, typeof cashInDrawer);

  // How much change should be given?
  let TotalChange = cash - price;
  // console.log("Total amount of change to be paid out", TotalChange,  typeof TotalChange);

  // Work out total amount in drawer
  const amountInDrawer = [];
  cid.forEach((item) => amountInDrawer.push(item[1]));
  let initialValue = 0;
  const totalInDrawer = amountInDrawer.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  // console.log("Total amount of money in the drawer", totalInDrawer, typeof totalInDrawer);

  // If total amount in drawer is less than the change owed, then it's an automatic out
  if (totalInDrawer < TotalChange) {
    return { status: "INSUFFICIENT_FUNDS", change: change };
  }

  // Reverse the cash in drawer array of objects so that it is easier to loop through from highest to lowest.
  let reversedCashInDrawer = cashInDrawer.reverse();
  console.log(
    "Reversed cash in drawer",
    reversedCashInDrawer,
    typeof reversedCashInDrawer
  );

  // Write function to loop through cash in drawer to remove required change and push change into change array
  function makeChange(changeDue, drawer) {
    if (changeDue === 0 && totalInDrawer > TotalChange) {
      return { status: "OPEN", change: change };
    } else if (changeDue === 0 && totalInDrawer === TotalChange) {
      return { status: "CLOSED", change: change };
    } else {
      const index = drawer.findIndex((slot) => {
        changeDue >= slot.unitOfSlot && slot.countItemsInSlot > 0;
      });

      const highestSlot = drawer[index];

      console.log("highest unit", index, highestSlot, typeof highestSlot);

      // need to check if highestSlot already exists in change array, then add one to already exitsing count

      change.push([
        `${highestSlot.nameOfSlot}`,
        Number(`${highestSlot.unitOfSlot}`),
      ]);
      console.log("change", change, typeof change);
      Number(drawer[index].countItemsInSlot) - 1;
      Number(drawer[index].totalValueInSlot) - Number(drawer[index].unitOfSlot);
      // makeChange(
      //   changeDue - Number(highestSlot.unitOfSlot),
      //   drawer
      // );
    }
  }
  makeChange(TotalChange, reversedCashInDrawer);

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
