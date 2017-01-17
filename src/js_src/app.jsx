(function () {
	'use strict';

	window.ee = new EventEmitter();

	var initialRecipeList = [
	{
		name: 'xxx',
		ingredients: [
		{
			name: 'water',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'sugar',
			amount: 4,
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
		removeButtonClick: function(recipeId, e) {
			e.preventDefault();
			e.stopPropagation();
			window.ee.emit('Recipe.remove', recipeId);
		},
		editButtonClick: function(recipeId, e) {
			e.preventDefault();
			e.stopPropagation();
			window.ee.emit('Recipe.edit', recipeId);
		},
		render: function() {
			var recipeId = this.props.recipeId;
			return (
				<div className="recipe__controls">
					<button onClick={this.removeButtonClick.bind(this, recipeId)} >Remove</button>
					<button onClick={this.editButtonClick.bind(this, recipeId)} >Edit</button>
				</div>
				);
		}
	});

	var SingleRecipe = React.createClass({
		render: function() {
			var recipe = this.props.data,
			recipeId = this.props.recipeId;
			return (
				<div className="recipe" >
					<h1 className="recipe__name" >{recipe.name}</h1>
					
					<Ingredients data={recipe.ingredients}/>
					<p className="recipe__instructions" >Instructions: {recipe.instructions}</p>
					<p className="recipe__date" >Date: {recipe.date}</p>
					<RecipeControls recipeId={recipeId} />
				</div>
				);
		}
	});

	var RecipeList = React.createClass({
		render: function() {
			var recipeList = this.props.recipeList;
			var RecipeListTemplate;

			if (recipeList.length > 0) {
				RecipeListTemplate = recipeList.map(function(item, index) {
					return (
						<SingleRecipe recipeId={index} data={item} key={index}/>
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

	var EditorControls = React.createClass({
		saveButtonClick: function(recipeId, e) {
			e.preventDefault();
			e.stopPropagation();
			// собирать recipe по кусочкам из ref
			// отправлять и id и объект
			window.ee.emit('Recipe.publish', recipeId);
		},
		cancelButtonClick: function(e) {
			e.preventDefault();
			e.stopPropagation();
			window.ee.emit('Recipe.cancel');
		},
		render: function() {
			var recipeId = this.props.recipeId;
			return (
				<div className="recipe__controls">
					<button onClick={this.saveButtonClick.bind(this, recipeId)} >Save</button>
					<button onClick={this.cancelButtonClick} >Cancel</button>
				</div>
				);
		}
	});

	var RecipeEditor = React.createClass({
		render: function() {
			var recipe = this.props.recipe,
				recipeId = this.props.recipeId;
			console.log('<RecipeEditor> render();');
			console.log(recipe);
			return (
				<div className="recipe-editor">
					ok
					<EditorControls recipeId={recipeId} />
				</div>
				);
		}
	});

	var App = React.createClass({
		// state is only here
		// we should dump state to storage every time
		getInitialState: function() {
			return {
				recipeList: initialRecipeList,
				navigator: {
					currentView: 'list',
					recipeId: -1
				}
			};
		},
		componentDidMount: function() {
			var self = this;
			window.ee.addListener('Recipe.remove', function(id) {
				var nextList = self.state.recipeList;
				nextList.splice(id, 1);
				self.setState({recipeList: nextList});
			});
			window.ee.addListener('Recipe.edit', function(id) {
				self.setState({navigator: {currentView: 'edit', recipeId: id}});
			});
			window.ee.addListener('Recipe.publish', function(id) {
				// PUSH or EDIT ?
				// we should take an object, not only id
				console.log('published: '+id);
				self.setState({navigator: {currentView: 'list', recipeId: -1}});
			});
			window.ee.addListener('Recipe.cancel', function() {
				self.setState({navigator: {currentView: 'list', recipeId: -1}});
			});
		},
		componentWillUnmount: function() {
			window.ee.removeListener('Recipe.remove');
			window.ee.removeListener('Recipe.edit');
			window.ee.removeListener('Recipe.publish');
			window.ee.removeListener('Recipe.cancel');
		},
		render: function() {
			var recipeList = this.state.recipeList,
			currentView = this.state.navigator.currentView,
			recipeId = this.state.navigator.recipeId;
			console.log('<App> render('+currentView+');');
			return (
				<section>
				<PageHeader />
				{ (currentView === 'list') && <RecipeList recipeList={recipeList}/> }
				{ (currentView === 'edit') && <RecipeEditor recipeId={recipeId} recipe={recipeList[recipeId]}/> }
				</section>
				);
		}
	});

	ReactDOM.render(
		<App />,
		document.getElementById('root')
		);

}());