(function () {
    'use strict';

    window.ee = new EventEmitter();

    Array.prototype.clone = function () {
        let arr = this.slice(0), i;
        for (i = 0; i < this.length; i += 1) {
            if (this[i].clone) {
                arr[i] = this[i].clone();
            }
        }
        return arr;
    };

    class SingleIngredient extends React.Component {
        render() {
            let {name, amount, measure} = this.props.ingredient
            return (
                <tr className="ingredient">
                <td className="ingredient__name" >{name}</td>
                <td className="ingredient__amount digits" >{amount}</td>
                <td className="ingredient__measure" >{measure}</td>
                </tr>
                )
        }
    }

    class IngredientsHeading extends React.Component {
        render() {
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
    }

    class Ingredients extends React.Component {
        render() {
            let ingredientsTemplate;
            let ingredients = this.props.ingredients;

            if (ingredients.length) {
                ingredientsTemplate = ingredients.map((item, index) => <SingleIngredient ingredient={item} key={index} />)
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
    }

    class RecipeControls extends React.Component {
        static defaultProps = {
            recipeId: -1,
        };

        state = this.props;

        onRemoveClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.remove', this.state.recipeId);
        };

        onEditClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.edit', this.state.recipeId);
        };

        render() {
            return (
                <div className="recipe__controls">
                <button onClick={this.onRemoveClick} >Remove</button>
                <button onClick={this.onEditClick} >Edit</button>
                </div>
                );
        }
    }

    class Instructions extends React.Component {
        render() {
            let instructionsTemplate;
            let instructionsArray = this.props.instructions.split('\n');
            instructionsTemplate = instructionsArray.map((item, index) => <p>{item}</p>)
            return (
                <div className="recipe__instructions">
                <h3>Instructions: </h3>
                    {instructionsTemplate}
                </div>
                );
        }
    }

    class SingleRecipe extends React.Component {
    	formattedDate(dateIsoString) {
    		let tempDate = new Date(Date.parse(dateIsoString));
    		let dd = tempDate.getDate();
    		(dd < 10) && (dd = '0' + dd);
			let mm = tempDate.getMonth() + 1;
			(mm < 10) && (mm = '0' + mm);
			let yy = tempDate.getFullYear() % 100;
			(yy < 10) && (yy = '0' + yy);
			return dd +'.'+ mm +'.'+ yy;
    	}
        render() {
            let {recipe: {name, ingredients, instructions, date}, recipeId} = this.props;
            return (
                <div className="recipe" >
                    <h1 className="recipe__name" >{name}</h1>
                    <Ingredients ingredients={ingredients} />
                    <Instructions instructions={instructions} />
                    <p className="recipe__date" >{this.formattedDate(date)}</p>
                    <RecipeControls recipeId={recipeId} />
                </div>
                );
        }
    }

    class RecipeList extends React.Component {
        onAddRecipeClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.edit', -1);
        };
        render() {
            let {recipeList} = this.props;
            let RecipeListTemplate;

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
                <button onClick={this.onAddRecipeClick} >+ Add new Recipe</button>
                {RecipeListTemplate}
                </div>
                );
        }
    }


    class EditorSingleIngredient extends React.Component {
        componentDidMount() {
            this.updateInputElements(this);
        }

        componentDidUpdate() {
            this.updateInputElements(this);
        }

        updateInputElements() {
            ReactDOM.findDOMNode(this.refs.name).value = this.props.ingredient.name;
            ReactDOM.findDOMNode(this.refs.amount).value = this.props.ingredient.amount;
            ReactDOM.findDOMNode(this.refs.measure).value = this.props.ingredient.measure;
        }

        onAnyFieldChange = (e) => {            
            let obj = {
                id: this.props.ingredientId,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                amount: ReactDOM.findDOMNode(this.refs.amount).value,
                measure: ReactDOM.findDOMNode(this.refs.measure).value,
            };
            window.ee.emit('Ingredient.update', obj);
        };

        onRemoveClick = (id, e) => {
            e.preventDefault();
            window.ee.emit('Ingredient.remove', id);
        };

        render() {
            let {ingredient: {name, amount, measure}, ingredientId} = this.props;
            return (
                <tr className="ingredient">
                    <td className="ingredient__name" >
                        <input type='text' onChange={this.onAnyFieldChange} placeholder='Ingredient name' ref='name'/>
                    </td>
                    <td className="ingredient__amount digits" >
                        <input type='text' onChange={this.onAnyFieldChange} placeholder='amount' ref='amount'/>
                    </td>
                    <td className="ingredient__measure" >
                        <input type='text' onChange={this.onAnyFieldChange} placeholder='measure' ref='measure'/>
                        <button onClick={this.onRemoveClick.bind(this,ingredientId)} >X</button>
                    </td>
                </tr>
                )
        }
    }

    class EditorIngredients extends React.Component {
        onAddIngredientClick = (e) => {
            e.preventDefault();
            window.ee.emit('Ingredient.add');
        };
        render() {
            let {ingredients} = this.props;
            let ingredientsTemplate;
            if (ingredients.length) {
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
                    <button onClick={this.onAddIngredientClick} >+ Add one more Ingredient</button>
                </table>
                );
        }
    }

    class RecipeEditor extends React.Component {
        static defaultProps = {
            recipe: {
                id: -1,
                name: '',
                ingredients: [
                {
                    name: '',
                    amount: '',
                    measure: '',
                }
                ],
                instructions: '',
            }
        };

        state = this.props.recipe;

        componentDidMount() {
            this.addEventListeners(this);
            this.updateInputElements(this);
        }
        componentDidUpdate() {
            this.updateInputElements(this);
        }
        componentWillUnmount() {
            this.removeEventListeners(this);
        }

        addEventListeners() {
        	// event
            window.ee.addListener('Ingredient.remove', (id) => {
                let nextList = this.state.ingredients.clone();
                nextList.splice(id, 1);
                this.setState({ingredients: nextList});
            });
            // event
            window.ee.addListener('Ingredient.add', (id) => {
                let nextList = this.state.ingredients.clone();
                nextList.push({
                    name: '',
                    amount: '',
                    measure: '',
                });
                this.setState({ingredients: nextList});
            });
            // event
            window.ee.addListener('Ingredient.update', (obj) => {
                let nextList = this.state.ingredients.clone();
                nextList[obj.id] = {
                    name: obj.name,
                    amount: obj.amount,
                    measure: obj.measure,
                };
                this.setState({ingredients: nextList});
            });
        }
        removeEventListeners() {
            window.ee.removeListener('Ingredient.remove');
            window.ee.removeListener('Ingredient.update');
            window.ee.removeListener('Ingredient.add');
        }
        updateInputElements() {
            ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
            ReactDOM.findDOMNode(this.refs.instructions).value = this.state.instructions;
        }

        onAnyFieldChange = (e) => {
            this.setState({
                name: ReactDOM.findDOMNode(this.refs.name).value, 
                instructions: ReactDOM.findDOMNode(this.refs.instructions).value
            });
        };
        onSaveClick = (e) => {
            e.preventDefault();
            let obj = {
                id: this.props.recipeId,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                ingredients: this.state.ingredients.clone(),
                instructions: ReactDOM.findDOMNode(this.refs.instructions).value,
            };
            window.ee.emit('Recipe.publish', obj);
        };
        onCancelClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.cancel');
        };

        render() {
            return (
                <div className="recipe-editor">
                <h1 className="recipe__name" >
                <input type='text' onChange={this.onAnyFieldChange} placeholder='Recipe name' ref='name'/>
                </h1>

                <EditorIngredients ingredients={this.state.ingredients}/>

                <h3>Instructions:</h3>
                <textarea className='recipe__instructions' onChange={this.onAnyFieldChange} placeholder='Recipe instructions' ref='instructions'></textarea>
                <div className="recipe__controls">
                <button onClick={this.onSaveClick} >Save</button>
                <button onClick={this.onCancelClick} >Cancel</button>
                </div>
                </div>
                );
        }
    }

    class PageHeader extends React.Component{
        render() {
            return (
                <div className="page__title">
                    <h1>Recipe Box</h1>
                    <h2>Don't worry, all your recipes will be stored locally.</h2>

                    <em>Project by <a href="http://vladimirlogachev.ru" target="_blank" rel="noopener noreferrer">Vladimir Logachev</a>. </em>
                    <em>Made with React and SASS. <a href="https://github.com/LogachevFCCprojects/RecipeBox" target="_blank" rel="noopener noreferrer">Github</a></em>
                </div>
                )
        }
    }

    class App extends React.Component {
    	constructor(state) {
    		super(state);
            //maybe here read local storage 

            // sort array (mutes, don't use with React.Component.state)    
            this.arraySortByDateField(initialRecipeList);
            this.state = {
	            recipeList: initialRecipeList,
	            route: {
	                current: 'list'
	            }
	        };
        }

        componentDidMount() {
            this.addEventListeners(this);
        }
        componentWillUnmount() {
            this.removeEventListeners(this);
        }

        addEventListeners() {
        	// event
            window.ee.addListener('Recipe.remove', (id) => {
                let nextList = this.state.recipeList.clone();
                nextList.splice(id, 1);
                this.setState({recipeList: nextList});
            });
            // event
            window.ee.addListener('Recipe.edit', (id) => {
                this.setState({route: {current: 'edit', recipeId: id}});
            });
            // event
            window.ee.addListener('Recipe.publish', (obj) => {
                let targetIndex = obj.id,
                	d = new Date(),
                	nextRecipeList = this.state.recipeList.clone();
                // check index and edit array item
                nextRecipeList[targetIndex] || (targetIndex = nextRecipeList.push());
                nextRecipeList[targetIndex] = {
                    name: obj.name,
                    ingredients: obj.ingredients.clone(),
                    instructions: obj.instructions,
                    date: d.toISOString(),
                };     
                // sort array (mutes, don't use with React.Component.state)    
                this.arraySortByDateField(nextRecipeList);
                // flush
                this.setState({recipeList: nextRecipeList, route: {current: 'list'}});
            });
            // event
            window.ee.addListener('Recipe.cancel', () => {
                this.setState({route: {current: 'list'}});
            });
        }
        removeEventListeners() {
            window.ee.removeListener('Recipe.remove');
            window.ee.removeListener('Recipe.edit');
            window.ee.removeListener('Recipe.publish');
            window.ee.removeListener('Recipe.cancel');
        }
        arraySortByDateField (arrayToSort) {
        	// mutes, don't use with React.Component.state
        	return arrayToSort.sort((a, b) => {
                let date1 = new Date(Date.parse(a.date));
                let date2 = new Date(Date.parse(b.date));
                return date2 - date1;
            });  
        }

        render() {
            let {recipeList, route:{current, recipeId}} = this.state;
            return (
                <section>
                    <PageHeader />
                    { (current === 'list') && <RecipeList recipeList={recipeList}/> }
                    { (current === 'edit') && <RecipeEditor recipeId={recipeId} recipe={recipeList[recipeId]}/> }
                </section>
                );
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
        );
}());
