import fs from "fs";

// Get data from file.
let fileContent = fs.readFileSync(
  "src/test/validate/validate_data.txt",
  "utf-8",
  (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
);

let myFilter = (elm) => {
  // check empty string.
  return elm != null && elm !== false && elm !== "";
};

let classifyEmailType = () => {
  // Read file and remove all empty string.
  let emailList = fileContent.split("\r\n");
  let preprocessList = emailList.filter(myFilter);

  // Classify emails into 'validEmails' and 'invalidEmails' lists.
  let endOfValid = preprocessList.indexOf("Email invalid:");
  let validEmails = preprocessList.slice(1, endOfValid);
  let invalidEmails = preprocessList.slice(
    endOfValid + 1,
    preprocessList.length
  );

  return [validEmails, invalidEmails];
};

let packingTestCase = (emailList, valueExpected) => {
  let resultList = [];
  for (let idx = 0; idx < emailList.length; idx++) {
    resultList.push([emailList[idx], valueExpected]);
  }
  return resultList;
};

let packingTestSuite = () => {
  let [validEmails, invalidEmails] = classifyEmailType();
  let validPack = packingTestCase(validEmails, true);
  let invalidPack = packingTestCase(invalidEmails, false);
  return [validPack, invalidPack];
};

export default packingTestSuite;
