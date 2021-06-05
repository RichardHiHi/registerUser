const reducer = (state, action) => {
  if (action.type === 'SET_VALUE') {
    return {
      ...state,
      [action.payload.name]: {
        ...state[action.payload.name],
        value: action.payload.value,
      },
    };
  }
  if (action.type === 'CKECK_VALUE') {
    const valueName = action.payload;
    const value = state[valueName].value;
    let newErrorMessage = '';
    let newIsHidden = false;
    if (value === '') {
      return {
        ...state,
        [valueName]: {
          ...state[valueName],
          isHidden: true,
          errorMessage: `${valueName} must be filled out`,
        },
      };
    }

    if (action.payload === 'email') {
      //regex for checking email
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = regex.test(String(value).toLowerCase());
      if (!check) {
        newErrorMessage = 'You have entered an invalid email address!';
        newIsHidden = true;
      }
    }

    if (action.payload === 'phoneNumber') {
      const regex = /((0[1|3|5|7|8|9])+([0-9]{8})\b)/g;
      const check = regex.test(String(value).toLowerCase());
      if (!check) {
        newErrorMessage = 'Please enter valid phone number.';
        newIsHidden = true;
      }
    }
    return {
      ...state,
      [valueName]: {
        ...state[valueName],
        isHidden: newIsHidden,
        errorMessage: newErrorMessage,
      },
    };
  }
  if (action.type === 'CLEAR_ALL') {
    return {
      ...state,
      email: { value: '', isHidden: false, errorMessage: '' },
      firstName: { value: '', isHidden: false, errorMessage: '' },
      lastName: { value: '', isHidden: false, errorMessage: '' },
      address: { value: '', isHidden: false, errorMessage: '' },
      phoneNumber: { value: '', isHidden: false, errorMessage: '' },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
