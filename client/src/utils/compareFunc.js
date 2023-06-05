const sortById = (objA, objB) => {
  let idA = objA.id,
    idB = objB.id;

  if (idA < idB) return -1;
  if (idA > idB) return 1;
  return 0;
};

const sortByValue = (objA, objB) => {
  let valA = objA.value,
    valB = objB.value;

  if (valA < valB) return -1;
  if (valA > valB) return 1;
  return 0;
};

export { sortById, sortByValue };
