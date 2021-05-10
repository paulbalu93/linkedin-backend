import express from 'express';
import mongoose from 'mongoose';
import profileRoutes from './services/profile/index.js';
import listEndPoints from 'express-list-endpoints';
// import postRoutes from './services/post/index.js';
import experienceRoutes from './services/experience/index.js';
const server = express();

const port = process.env.PORT;

server.use(express.json());
server.use('/profile', profileRoutes);
server.use('/experience', experienceRoutes);
console.log(listEndPoints(server));

mongoose
	.connect(process.env.MONGO_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() =>
		server.listen(port, () => {
			if (process.env.NODE_ENV === 'production') {
				// no need to configure it manually on Heroku
				console.log('Server running on cloud on port: ', port);
			} else {
				console.log('Server running locally on port: ', port);
			}
		})
	);
