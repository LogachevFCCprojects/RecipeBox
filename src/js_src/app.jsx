(function () {
	'use strict';
	var recipeList = [
	{
		name: 'black tea wit suga',
		ingredients: [
		{
			name: 'water',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'sugar',
			amount: 5,
			measure: 'g'
		},
		{
			name: 'black tea',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 3 minutes',
		date: 'today'
	},
	{
		name: 'black tea wit suga',
		ingredients: [
		{
			name: 'water',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'sugar',
			amount: 5,
			measure: 'g'
		},
		{
			name: 'black tea',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 3 minutes',
		date: 'today'
	},
	{
		name: 'another tea',
		ingredients: [
		{
			name: 'cold water',
			amount: 350,
			measure: 'ml'
		},
		{
			name: 'brown sugar',
			amount: 7,
			measure: 'g'
		},
		{
			name: 'black tea',
			amount: 8,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 6 minutes',
		date: 'yesterday'
	}
	];

	var PageHeader = React.createClass({
		render: function() {
			console.log(this.props.data);
			return (
				<div className="page__title">
				<h1>Recipe Box</h1>
				<h2>Don't worry, all your recipes will be stored locally.</h2>

				<em>Project by <a href="http://vladimirlogachev.ru" target="_blank" rel="noopener noreferrer">Vladimir Logachev</a>. </em>
				<em>Made with React and SASS. <a href="https://github.com/LogachevFCCprojects/RecipeBox" target="_blank" rel="noopener noreferrer">Github</a></em>
				</div>
				)
		}
	});

	var SingleIngredient = React.createClass({
		render: function() {
			console.log(this.props.data);
			var ingredient = this.props.data;
			return (
				<tr className="ingredient">
					<td className="ingredient__name" >{ingredient.name}</td>
					<td className="ingredient__amount digits" >{ingredient.amount}</td>
					<td className="ingredient__measure" >{ingredient.measure}</td>
				</tr>
				)
		}
	});

	var IngredientsHeading = React.createClass({
		render: function() {
			return (
				<thead className="allingredients__heading">
					<tr>
						<th>Ingredient</th>
						<th className="digits">Amount</th>
						<th>Measure</th>
					</tr>
				</thead>
				)
		}
	});

	var Ingredients = React.createClass({
		render: function() {
			console.log(this.props.data);
			var ingredients = this.props.data;
			var ingredientsTemplate;

			if (ingredients.length > 0) {
				ingredientsTemplate = ingredients.map(function(item, index) {
					return (
						<SingleIngredient data={item} key={index} />
						)
				})
			} else {
				ingredientsTemplate = <p>No ingredients in this recipe</p>
			}

			return (
				<table className="allingredients">
					<IngredientsHeading/>
					<tbody className="allingredients__body">
						{ingredientsTemplate}
					</tbody>
				</table>
				);
		}
	});

	var RecipeControls = React.createClass({
		render: function() {
			return (
				<div className="recipe__controls">
					<p>Remove | Edit.</p>
				</div>
				);
		}
	});

	var SingleRecipe = React.createClass({
		render: function() {
			var recipe = this.props.data;
			return (
				<div className="recipe" >
					<h1 className="recipe__name" >{recipe.name}</h1>
					
					<Ingredients data={recipe.ingredients}/>
					<p className="recipe__instructions" >Instructions: {recipe.instructions}</p>
					<p className="recipe__date" >Date: {recipe.date}</p>
					<RecipeControls />
				</div>
				);
		}
	});

	var RecipeList = React.createClass({
		render: function() {
			var recipeList = this.props.data;
			var RecipeListTemplate;

			if (recipeList.length > 0) {
				RecipeListTemplate = recipeList.map(function(item, index) {
					return (
						<SingleRecipe data={item} key={index} />
						)
				})
			} else {
				RecipeListTemplate = <p>No recipes yet</p>
			}

			return (
				<div className="recipe-list">
					{RecipeListTemplate}
				</div>
				);
		}
	});

	var App = React.createClass({
		render: function() {
			return (
				<section>
				<PageHeader />
					<RecipeList data={recipeList}/>
				</section>
				);
		}
	});

	ReactDOM.render(
		<App />,
		document.getElementById('root')
		);

}());