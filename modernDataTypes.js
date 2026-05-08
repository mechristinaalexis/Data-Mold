const modernDataTypes = {
  DISTANCE: {
    sqlType: "FLOAT",
    regex: /^\d+(\.\d+)?$/, 
  },
  CITY_PINCODE: {
    sqlType: "VARCHAR(10)",
    regex: /^[A-Za-z0-9]{4,10}$/, 
  },
  COUNTRY: {
    sqlType: "VARCHAR(100)",
    regex: /^[A-Za-z\s]{2,100}$/, 
  },
  GENDER: {
    sqlType: "ENUM('Male', 'Female', 'Other')",
    regex: /^(Male|Female|Other)$/, 
  },
  AGE: {
    sqlType: "TINYINT UNSIGNED",
    regex: /^(?:[1-9]?[0-9]|1[01][0-9]|12[0-7])$/, 
  },
  PHONE_NUMBER: {
    sqlType: "VARCHAR(15)",
    regex: /^\+?\d{10,15}$/, 
  },

  EMAIL: {
    sqlType: "VARCHAR(255)",
    regex: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
  }
};

module.exports = modernDataTypes;

