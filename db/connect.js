const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect((url), {
      //they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parse they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parse
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
