import express from 'express';
import mongoose from 'mongoose';
import profileRoutes from './services/profile/index.js';
import listEndPoints from 'express-list-endpoints';
// import postRoutes from './services/post/index.js';
// import experienceRoutes from './services/experience/index.js'
const server = express();

const port = process.env.PORT;

server.use(express.json());
server.use('/profile', profileRoutes);
// server.use('/books', booksRoutes);
console.log(listEndPoints(server));

mongoose
	.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() =>
		server.listen(port, () => {
			console.log('sever is running on port', port);
		})
	);
