import m, { Component, mount } from 'mithril';
import { Recipe } from '../shared/domain-models';
import { createRecipe, destroyRecipe, getAllRecipes, loadAllRecipes } from './recipes-service';

function recipeView(recipe: Recipe) {
	const buttonAttrs = {
		onclick() {
			destroyRecipe(recipe);
		}
	}

	return m('div',
		recipe.title, ' ',
		m('button', buttonAttrs, 'Destroy')
	);
}

function recipesList(recipes: Recipe[]) {
	return recipes.map(recipeView);
}

function CreateRecipeForm(): Component {
	let title = '';

	const inputAttrs = {
		placeholder: 'Enter title...',
		oninput(event: Event) {
			if (event.target) {
				title = (event.target as HTMLInputElement).value;
			}
		}
	};

	const formAttrs = {
		onsubmit(event: Event) {
			event.preventDefault();
			createRecipe({ id: '', title: title });
		}
	}

	const buttonAttrs = {
		type: 'submit'
	};

	return {
		view() {
			return m('form', formAttrs,
				m('input', inputAttrs),
				m('button', buttonAttrs, 'Create')
			);
		}
	};
}

function App(): Component {
	return {
		oncreate() {
			loadAllRecipes()
		},
		view() {
			return m('div',
				recipesList(getAllRecipes()),
				m(CreateRecipeForm)
			);
		}
	}
}

mount(document.body, App);
