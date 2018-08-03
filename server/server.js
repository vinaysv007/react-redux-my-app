import express from 'express';
import bp from 'body-parser';
import cors from 'cors';
import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';
import dotenv from 'dotenv';

dotenv.config();
var app = express();
var port = process.env.SERVER_PORT || 8000;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/user', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

app.listen(port, () => {
    console.log('server started at ', port);
});