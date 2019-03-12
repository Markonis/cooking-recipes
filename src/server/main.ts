import express from 'express';
import path from 'path';
import ExpressApiMounter from 'typeful-api-express';
import api from '../shared/api';
import { create, destroy, list, read, update } from './recipes-repository';
import bodyParser = require('body-parser');

// Initialize the express server
const server = express();
server.use(bodyParser.json());

// Mount the recipes API handlers
const mounter = new ExpressApiMounter(server);
mounter.mountHandler(api.recipe.create, create);
mounter.mountHandler(api.recipe.read, read);
mounter.mountHandler(api.recipe.update, update);
mounter.mountHandler(api.recipe.destroy, destroy);
mounter.mountHandler(api.recipe.list, list);

// Serve static files
const staticRoot = path.join(__dirname, '../client');
server.use(express.static(staticRoot));

// Listen for connections
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
