const validate = (input: {
  validity: any;
  setCustomValidity: (arg0: string) => void;
}) => {
  let validityState_object = input.validity;
  if (validityState_object.valueMissing) {
    input.setCustomValidity("Поле обязательно к заполнению!");
  } else if (validityState_object.patternMismatch) {
    input.setCustomValidity("Формат не соответствует!");
  } else {
    input.setCustomValidity("");
  }
};

export { validate };
