const arr = [
  {
    displayName: "sale 1",
    slabs: [
      {
        id: 1,
        value: 100,
        b_value: 100,
        config: "greater",
      },
      {
        id: 2,
        value: 100,
        config: "between",
        b_value: 100,
      },
      {
        id: 3,
        value: 100,
        config: "between",
        b_value: 100,
      },
    ],
  },
  {
    displayName: "sale 2",
    slabs: [
      {
        id: 1,
        value: 100,
        config: "greater",
        b_value: 100,
      },
      {
        id: 2,
        value: 100,
        config: "between",
        b_value: 100,
      },
      {
        id: 3,
        value: 100,
        config: "between",
        b_value: 100,
      },
    ],
  },
  {
    displayName: "sale 3",
    slabs: [
      {
        id: 1,
        value: 100,
        config: "greater",
        b_value: 100,
      },
      {
        id: 2,
        value: 100,
        config: "between",
        b_value: 100,
      },
      {
        id: 3,
        value: 100,
        config: "between",
        b_value: 100,
      },
    ],
  },
];
let newArr = [];
let slab = 1;

for (let i = 0; i < arr.length; i++) {
  let el = arr[i].slabs.length;
  slab = el * slab ;
  newArr.push({
    p_value: slab / arr[i].slabs.length,
    ...arr[i],
  });
}
// let finalarr = [];
// for (let i = 0; i < newArr[1].p_value / newArr[1].slabs.length; i++) {

// }

console.log(newArr);
