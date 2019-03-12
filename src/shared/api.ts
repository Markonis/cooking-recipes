import { setPaths, ApiEndpoint } from 'typeful-api';
import { Recipe } from './domain-models';


export interface FindParams {
	id: string
}

const api = setPaths({
	recipe: {
		create: new ApiEndpoint<Recipe, Recipe>(),
		read: new ApiEndpoint<FindParams, Recipe>(),
		update: new ApiEndpoint<Recipe, Recipe>(),
		destroy: new ApiEndpoint<FindParams, undefined>(),
		list: new ApiEndpoint<undefined, Recipe[]>()
	}
});

export default api;
