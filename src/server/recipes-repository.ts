import { Recipe } from "../shared/domain-models";
import cuid = require("cuid");
import { FindParams } from "../shared/api";
import { find, findIndex } from 'lodash';

const recipes: Recipe[] = [
	{ id: cuid(), title: 'Recipe 1' },
	{ id: cuid(), title: 'Recipe 2' }
];

export async function create(recipe: Recipe) {
	recipe.id = cuid();
	recipes.push(recipe);
	return recipe;
}

export async function read(params: FindParams) {
	return find(recipes, { id: params.id });
}

export async function update(recipe: Recipe) {
	const index = findIndex(recipes, { id: recipe.id });
	if (index > -1) recipes.splice(index, 1, recipe);
	return recipe;
}

export async function destroy(params: FindParams) {
	const index = findIndex(recipes, { id: params.id });
	if (index > -1) recipes.splice(index, 1);
}

export async function list() {
	return recipes;
}
