/*
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

function findLargest(changeDue) {
  reversedCashInDrawer.forEach((slot) => {
    if (changeDue > slot.unitOfSlot) {
      slot.countItemsInSlot - 1;
      slot.totalValueInSlot - slot.unitOfSlot;
      change.push([`${slot.nameOfSlot}`, Number(`${slot.unitOfSlot}`)]);
    }
  });
}

let reversedCid = cid.reverse();
for (let item of reversedCid) {
  let slot = item[0];
  let totalValueInSlot = item[1];
  if (changeDue > denomination[slot] && totalValueInSlot > denomination[slot]) {
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

function findLargest(changeDue) {
  reversedCashInDrawer.forEach((slot) => {
    console.log("add to change", [
      `${slot.nameOfSlot}`,
      Number(`${slot.unitOfSlot}`),
    ]);
  });
}

function countDownFrom(number) {
  if (number === 0) {
    return;
  }

  console.log(number);
  countDownFrom(number - 1);
}

// countDownFrom(5);

function multiply(arr, n) {
  if (n <= 0) {
    return 1;
  } else {
    return multiply(arr, n - 1) * arr[n - 1];
  }
}

function sum(arr, n) {
  if (n <= 0) {
    return 0;
  } else {
    return sum(arr, n - 1) + arr[n - 1];
  }
}

// console.log(sum([2, 3, 4], 1));

//
let index;

drawer.find((slot, i) => {
  Number(changeOwed) >= Number(slot.unitOfSlot) &&
    Number(slot.countItemsInSlot) != 0;
  index = i;
});

let highestSlot = drawer[index];

console.log("highest unit", index, highestSlot);

let index = drawer.findIndex((slot) => {
  Number(changeOwed) >= Number(slot.unitOfSlot) &&
    Number(slot.countItemsInSlot) > 0;
});

let highestSlot = drawer[index];
*/

let change = [
  ["QUARTER", 0.25],
  ["QUARTER", 0.25],
];

if (change.some((slot) => slot[0] === highestSlot.nameOfSlot)) {
  const changeIndex = change.findIndex(
    (slot) => slot[0] === highestSlot.nameOfSlot
  );

  const replacement = [
    `${highestSlot.nameOfSlot}`,
    Number(`${highestSlot.unitOfSlot}`) + Number(`${change[changeIndex][1]}`),
  ];
  console.log("replacement", replacement);

  change.splice(changeIndex, 1, replacement);
}
