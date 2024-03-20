const validate = (input: {
  validity: any;
  setCustomValidity: (arg0: string) => void;
}) => {
  let validityState_object = input.validity;
  if (validityState_object.valueMissing) {
    input.setCustomValidity("This field is required!");
  } else if (validityState_object.patternMismatch) {
    input.setCustomValidity("Format does not match!");
  } else {
    input.setCustomValidity("");
  }
};

export { validate };
