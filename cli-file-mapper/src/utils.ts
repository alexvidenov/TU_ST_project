export const mergeArrBy = (
  arr1: any[],
  arr2: any[],
  attr1: any,
  attr2: any
) => {
  const grouped: any = {};

  arr1.forEach((obj1) => {
    const matchingObj = arr2.find((obj2) => obj2[attr2] === obj1[attr1]);

    if (matchingObj) {
      const key = obj1[attr1];
      grouped[key] = { ...obj1, ...matchingObj };
    }
  });

  return grouped;
};
