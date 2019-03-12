import { Recipe } from "../shared/domain-models";
import { ApiEndpoint } from "typeful-api";
import { request } from "mithril";
import api from "../shared/api";

let allRecipes: Recipe[] = [];

function sendRequest<TInput, TOutput>(endpoint: ApiEndpoint<TInput, TOutput>, data?: TInput) {
	return request<TOutput>({
		url: endpoint.pathStr(),
		data: data,
		method: 'POST'
	});
}

export function loadAllRecipes() {
	sendRequest(api.recipe.list)
		.then((recipes) => { allRecipes = recipes; });
}

export function createRecipe(recipe: Recipe) {
	sendRequest(api.recipe.create, recipe).then(loadAllRecipes);
}

export function destroyRecipe(recipe: Recipe) {
	const params = { id: recipe.id };
	sendRequest(api.recipe.destroy, params).then(loadAllRecipes);
}

export function getAllRecipes() {
	return allRecipes;
}
