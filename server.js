const express = require('express');
const app = express();
const http = require('http').Server(app);
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./src/models');
require('./src/db/sequelize');
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
// import routes
const UserRoutes = require('./src/router/User');
const JournalRoutes = require('./src/router/Journal');
const SignRoutes = require('./src/router/Sign');
const PostRoutes = require('./src/router/Post');

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//  use routes
app.use('/user', UserRoutes);
app.use('/journal',JournalRoutes);
app.use('/sign',SignRoutes);
app.use('/post',PostRoutes);

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

app.get('/', function(req, res) {
   res.send('hello world');
});

http.listen(PORT, function() {
   console.log(`listening on port ${PORT}`);
});