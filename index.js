require("dotenv").config();
const express = require("express");
const app = express();
const { connectToDb, getDb } = require("./src/db/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const userRoutes=require('./src/app/routes/userRoutes');
const postRoutes=require('./src/app/routes/postRoutes');
const followRoutes=require('./src/app/routes/followRoutes');
const likeRoutes=require('./src/app/routes/likeRoutes');
const commentRoutes=require('./src/app/routes/commentRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

connectToDb((err) => {
  if (err) {
    console.error("Error occurred while connecting to the database:", err);
    return;
  }
  console.log("Connected successfully to the database");

  app.use('/api/users',userRoutes);
  app.use('/api/posts',postRoutes);
  app.use('/api/follow',followRoutes);
  app.use('/api/like',likeRoutes);
  app.use('/api/comment',commentRoutes);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
