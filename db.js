const mongoose = require('mongoose');

require("dotenv").config();

const mongoURL = process.env.DATABASE;

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB");
  
      const fetched_data = await mongoose.connection.db.collection("food_item");
      const food_CategoryName = await mongoose.connection.db.collection("food_Category");
      // console.log("Fetching data...");
      const data = await fetched_data.find().toArray();
      const catData = await food_CategoryName.find().toArray();
        global.food_items = data
        global.food_category = catData
        // console.log(global.food_items,global.food_category);
    } catch (err) {
      console.error("Error not connecting to MongoDB:", err);
    }
  }


module.exports = mongoDB;



// mongoose
//   .connect('mongodb+srv://admin-gajendra:gajju123@cluster0.r4vxwmj.mongodb.net/gofoodDB?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
  
  // .then(() => {
  //   console.log('MongoDB connected');
  //   const fetched_data = mongoose.connection.db.collection("food_item");
  //   fetched_data.find({}).toArray(function(err, data){
  //       if(err) console.log(err);
  //       else console.log(data);
  //   })
  // })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB', err);
//   });

// module.exports = mongoDB;


// const mongoosedb = mongoose.connection

// mongoosedb.on('connected', ()=>{
//     console.log("Mongodb connected succesfully");
//     const fetched_data = mongoosedb.db.collection("food_item");
//     fetched_data.find({}).toArray(function(err, data){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//         }
//     })
// });

// mongoosedb.on('error', ()=>{
//     console.log("Mongodb not connected");
// });