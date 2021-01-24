function roundTwo(num) {
  return Math.round(num * 100) / 100;
}

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

  let totalChange = roundTwo(cash - price);

  const totalInDrawer = findTotalInDrawer(cid);

  if (totalInDrawer < totalChange) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    };
  }

  let reversedCashInDrawer = cashInDrawer.reverse();

  function makeChange(changeDue, drawer) {
    if (changeDue === 0 && totalInDrawer > totalChange) {
      console.log(changeDue, totalInDrawer, totalChange);
      return { status: "OPEN", change: change };
    } else if (changeDue === 0 && totalInDrawer === totalChange) {
      // change.push all empty slots and update just the slot that has some change in it to be given
      change.push(
        ["PENNY", 0],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
      );
      change.forEach((slot, i) => {
        if (change[0][0] === slot[0] && slot[1] === 0) {
          change.splice(i, 1);
        }
      });
      return { status: "CLOSED", change: change };
    } else {
      const index = drawer.findIndex(
        (slot) => changeDue >= slot.unitOfSlot && slot.countItemsInSlot > 0
      );

      if (index === -1) {
        return {
          status: "INSUFFICIENT_FUNDS",
          change: [],
        };
      }

      const highestSlot = drawer[index];

      if (change.some((slot) => slot[0] === highestSlot.nameOfSlot)) {
        const changeIndex = change.findIndex(
          (slot) => slot[0] === highestSlot.nameOfSlot
        );

        change.splice(changeIndex, 1, [
          highestSlot.nameOfSlot,
          roundTwo(highestSlot.unitOfSlot + change[changeIndex][1]),
        ]);
      } else {
        change.push([highestSlot.nameOfSlot, highestSlot.unitOfSlot]);
      }

      drawer.splice(index, 1, {
        nameOfSlot: highestSlot.nameOfSlot,
        unitOfSlot: highestSlot.unitOfSlot,
        countItemsInSlot: drawer[index].countItemsInSlot - 1,
        totalValueInSlot: roundTwo(
          drawer[index].totalValueInSlot - highestSlot.unitOfSlot
        ),
      });

      return makeChange(roundTwo(changeDue - highestSlot.unitOfSlot), drawer);
    }
  }
  return makeChange(totalChange, reversedCashInDrawer);
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
