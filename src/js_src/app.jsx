(function () {
	'use strict';

	window.ee = new EventEmitter();

	Array.prototype.clone = function () {
		var arr = this.slice(0), i;
		for (i = 0; i < this.length; i += 1) {
			if (this[i].clone) {
                //recursion
                arr[i] = this[i].clone();
            }
        }
        return arr;
    };

	var initialRecipeList = [
	{
		name: 'Zero Recipe',
		ingredients: [
		{
			name: 'Ingredient 0.0',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'Ingredient 0.1',
			amount: 4,
			measure: 'g'
		},
		{
			name: 'Ingredient 0.2',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 3 minutes',
		date: 'today'
	},
	{
		name: 'One Recipe',
		ingredients: [
		{
			name: 'Ingredient 1.0',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'Ingredient 1.1',
			amount: 4,
			measure: 'g'
		},
		{
			name: 'Ingredient 1.2',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 3 minutes',
		date: 'today'
	},
	{
		name: 'Two Recipe',
		ingredients: [
		{
			name: 'Ingredient 2.0',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'Ingredient 2.1',
			amount: 4,
			measure: 'g'
		},
		{
			name: 'Ingredient 2.2',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 6 minutes',
		date: 'yesterday'
	},
	{
		name: 'Three Recipe',
		ingredients: [
		{
			name: 'Ingredient 3.0',
			amount: 250,
			measure: 'ml'
		},
		{
			name: 'Ingredient 3.1',
			amount: 4,
			measure: 'g'
		},
		{
			name: 'Ingredient 3.2',
			amount: 5,
			measure: 'g'
		}

		],
		instructions: 'mix it up and wait 6 minutes',
		date: 'yesterday'
	}
	];



/// list

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
			console.log ('> emit > Ingredient.remove '+recipeId);
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
			var recipe = this.props.recipe,
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
						<SingleRecipe recipeId={index} recipe={item} key={index}/>
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

/// edit
	var EditorSingleIngredient = React.createClass({
		removeButtonClick: function(id, e) {
			e.preventDefault();
			e.stopPropagation();
			console.log ('ee > Ingredient.remove '+id);
			// get all 3 refs
			// prepare a line for an event

			// send event to the Editor, not to App
			// editor redraws without 1 line
			window.ee.emit('Ingredient.remove', id);
		},
		componentWillUnmount: function() {
			console.log('— '+this.props.ingredient.name); // ошибается и выдает в консоль хуету!
		},
		componentDidMount: function() {
			ReactDOM.findDOMNode(this.refs.name).value = this.props.ingredient.name;
			ReactDOM.findDOMNode(this.refs.amount).value = this.props.ingredient.amount;
			ReactDOM.findDOMNode(this.refs.measure).value = this.props.ingredient.measure;
		},
		componentDidUpdate: function() {
			ReactDOM.findDOMNode(this.refs.name).value = this.props.ingredient.name;
			ReactDOM.findDOMNode(this.refs.amount).value = this.props.ingredient.amount;
			ReactDOM.findDOMNode(this.refs.measure).value = this.props.ingredient.measure;
		},
		onFieldChange: function(fieldName, e) {
			var obj = [];
			obj.name = ReactDOM.findDOMNode(this.refs.name).value;
			obj.amount = ReactDOM.findDOMNode(this.refs.amount).value;
			obj.measure = ReactDOM.findDOMNode(this.refs.measure).value;
			obj.id = this.props.ingredientId;
			window.ee.emit('Ingredient.update', obj);
		},
		render: function() {
			var name = this.props.ingredient.name,
				amount = this.props.ingredient.amount,
				measure = this.props.ingredient.measure,
				ingredientId = this.props.ingredientId;
			return (
				<tr className="ingredient">
					<td className="ingredient__name" >
						<input type='text' onChange={this.onFieldChange} placeholder='Ingredient name' ref='name'/>
					</td>
					<td className="ingredient__amount digits" >
						<input type='text' onChange={this.onFieldChange} placeholder='amount' ref='amount'/>
					</td>
					<td className="ingredient__measure" >
						<input type='text' onChange={this.onFieldChange} placeholder='measure' ref='measure'/>
						<button onClick={this.removeButtonClick.bind(this, ingredientId)} >X</button>
					</td>
				</tr>
				)
		}

	});

	var EditorIngredients = React.createClass({
		render: function() {
			var ingredients = this.props.data;
			var ingredientsTemplate;
			if (ingredients.length > 0) {
				ingredientsTemplate = ingredients.map(function(item, index) {
					return (
						<EditorSingleIngredient ingredient={item} ingredientId={index} key={index} />
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

	var RecipeEditor = React.createClass({
		getInitialState: function() {
			return {
				name: this.props.recipe.name,
				ingredients: this.props.recipe.ingredients,
				instructions: this.props.recipe.instructions
			};
		},
		componentDidMount: function() {
			var self = this;
			window.ee.addListener('Ingredient.remove', function(id) {
				console.log ('Listener > Ingredient.remove '+id);
				var nextList = self.state.ingredients.clone();
				nextList.splice(id, 1);
				self.setState({ingredients: nextList});
			});
			window.ee.addListener('Ingredient.update', function(obj) {
				var nextList = self.state.ingredients.clone();
				nextList[obj.id].name = obj.name;
				nextList[obj.id].amount = obj.amount;
				nextList[obj.id].measure = obj.measure;
				self.setState({ingredients: nextList});
			});
			ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
			ReactDOM.findDOMNode(this.refs.instructions).value = this.state.instructions;
		},
		componentDidUpdate: function() {
			ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
			ReactDOM.findDOMNode(this.refs.instructions).value = this.state.instructions;
		},
		componentWillUnmount: function() {
			window.ee.removeListener('Ingredient.remove');
		},
		onFieldChange: function(fieldName, e) {
			this.setState({
				name: ReactDOM.findDOMNode(this.refs.name).value, 
				instructions: ReactDOM.findDOMNode(this.refs.instructions).value
			});
		},
		saveButtonClick: function(e) {
			e.preventDefault();
			e.stopPropagation();

			var obj = [];
			obj.id = this.props.recipeId;
			obj.name = ReactDOM.findDOMNode(this.refs.name).value;
			obj.ingredients = this.state.ingredients.clone();
			obj.instructions = ReactDOM.findDOMNode(this.refs.instructions).value;

			window.ee.emit('Recipe.publish', obj);
		},
		cancelButtonClick: function(e) {
			e.preventDefault();
			e.stopPropagation();
			window.ee.emit('Recipe.cancel');
		},
		render: function() {
			var recipe = this.props.recipe,
				ingredients = this.state.ingredients;
			return (
				<div className="recipe-editor">
					<h1 className="recipe__name" >
						<input type='text' onChange={this.onFieldChange} placeholder='Recipe name' ref='name'/>
					</h1>
					
					<EditorIngredients data={ingredients}/>
					<h3>Instructions:</h3>
					<textarea className='recipe__instructions' onChange={this.onFieldChange} placeholder='Recipe instructions' ref='instructions'></textarea>
					<div className="recipe__controls">
						<button onClick={this.saveButtonClick} >Save</button>
						<button onClick={this.cancelButtonClick} >Cancel</button>
					</div>
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
				pageNavigator: {
					currentView: 'list',
					recipeId: -1
				}
			};
		},
		componentDidMount: function() {
			var self = this;
			window.ee.addListener('Recipe.remove', function(id) {
				var nextList = self.state.recipeList.clone();
				nextList.splice(id, 1);
				self.setState({recipeList: nextList});
			});
			window.ee.addListener('Recipe.edit', function(id) {
				self.setState({pageNavigator: {currentView: 'edit', recipeId: id}});
			});
			window.ee.addListener('Recipe.publish', function(obj) {
				var nextRecipeList = self.state.recipeList.clone();
				nextRecipeList[obj.id] || (obj.id = nextRecipeList.push() - 1);

				nextRecipeList[obj.id].name = obj.name;
				nextRecipeList[obj.id].ingredients = obj.ingredients.clone();
				nextRecipeList[obj.id].instructions = obj.instructions;
				nextRecipeList[obj.id].date = 'today ZZZ'; //todo
				console.log('_______________');
				console.log(obj);
				self.setState({
					recipeList: nextRecipeList, 
					pageNavigator: {currentView: 'list', recipeId: -1}
				});
			});
			window.ee.addListener('Recipe.cancel', function() {
				self.setState({pageNavigator: {currentView: 'list', recipeId: -1}});
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
			currentView = this.state.pageNavigator.currentView,
			recipeId = this.state.pageNavigator.recipeId;
			console.log('+ App ('+currentView+');');
			console.log(recipeList);
			return (
				<section>
				<PageHeader />
				{ (currentView === 'list') && <RecipeList recipeList={recipeList}/> }
				{ (currentView === 'edit') && <RecipeEditor recipeId={recipeId} recipe={recipeList[recipeId]}/> }
				</section>
				);
		}
	});

/// all

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

	ReactDOM.render(
		<App />,
		document.getElementById('root')
		);

}());