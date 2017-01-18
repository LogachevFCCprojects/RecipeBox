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
            let ingredient = this.props.data;
            return (
                <tr className="ingredient">
                <td className="ingredient__name" >{ingredient.name}</td>
                <td className="ingredient__amount digits" >{ingredient.amount}</td>
                <td className="ingredient__measure" >{ingredient.measure}</td>
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
            let ingredients = this.props.data;
            let ingredientsTemplate;

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
    }

    class RecipeControls extends React.Component {
        removeButtonClick(recipeId, e) {
            e.preventDefault();
            window.ee.emit('Recipe.remove', recipeId);
        }
        editButtonClick(recipeId, e) {
            e.preventDefault();
            window.ee.emit('Recipe.edit', recipeId);
        }
        render() {
            let recipeId = this.props.recipeId;
            return (
                <div className="recipe__controls">
                <button onClick={this.removeButtonClick.bind(this, recipeId)} >Remove</button>
                <button onClick={this.editButtonClick.bind(this, recipeId)} >Edit</button>
                </div>
                );
        }
    }

    class SingleRecipe extends React.Component {
        render() {
            let recipe = this.props.recipe;
            let recipeId = this.props.recipeId;
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
    }

    class RecipeList extends React.Component {
        render() {
            let recipeList = this.props.recipeList;
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
        onFieldChange = (e) => {            
            let obj = {
                id: this.props.ingredientId,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                amount: ReactDOM.findDOMNode(this.refs.amount).value,
                measure: ReactDOM.findDOMNode(this.refs.measure).value,
            };
            window.ee.emit('Ingredient.update', obj);
        };
        removeButtonClick = (id, e) => {
            e.preventDefault();
            window.ee.emit('Ingredient.remove', id);
        };
        render() {
            let {name, amount, measure} = this.props.ingredient;
            let ingredientId = this.props.ingredientId;
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
    }

    class EditorIngredients extends React.Component {
        render() {
            let ingredients = this.props.data;
            let ingredientsTemplate;
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
    }

    class RecipeEditor extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: this.props.recipe.name,
                ingredients: this.props.recipe.ingredients,
                instructions: this.props.recipe.instructions, 
            };
        }
        componentDidMount() {
            let self = this;
            window.ee.addListener('Ingredient.remove', function(id) {
                let nextList = self.state.ingredients.clone();
                nextList.splice(id, 1);
                self.setState({ingredients: nextList});
            });
            window.ee.addListener('Ingredient.update', function(obj) {
                let nextList = self.state.ingredients.clone();
                nextList[obj.id] = {
                    name: obj.name,
                    amount: obj.amount,
                    measure: obj.measure,
                };
                self.setState({ingredients: nextList});
            });
            this.updateInputElements.bind(this)();
        }
        componentDidUpdate() {
            this.updateInputElements.bind(this)();
        }
        updateInputElements() {
            ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
            ReactDOM.findDOMNode(this.refs.instructions).value = this.state.instructions;
        }
        componentWillUnmount() {
            window.ee.removeListener('Ingredient.remove');
            window.ee.removeListener('Ingredient.update');
        }
        onFieldChange = (fieldName, e) => {
            this.setState({
                name: ReactDOM.findDOMNode(this.refs.name).value, 
                instructions: ReactDOM.findDOMNode(this.refs.instructions).value
            });
        };
        saveButtonClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            let obj = {};
            obj.id = this.props.recipeId;
            obj.name = ReactDOM.findDOMNode(this.refs.name).value;
            obj.ingredients = this.state.ingredients.clone();
            obj.instructions = ReactDOM.findDOMNode(this.refs.instructions).value;

            window.ee.emit('Recipe.publish', obj);
        };
        cancelButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            window.ee.emit('Recipe.cancel');
        }
        render() {
            let recipe = this.props.recipe,
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
    }

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                recipeList: initialRecipeList,
                pageNavigator: {
                    currentView: 'list',
                    recipeId: -1
                }
            };
        }
        componentDidMount() {

            let self = this;
            window.ee.addListener('Recipe.remove', function(id) {
                let nextList = self.state.recipeList.clone();
                nextList.splice(id, 1);
                self.setState({recipeList: nextList});
            });
            window.ee.addListener('Recipe.edit', function(id) {
                self.setState({pageNavigator: {currentView: 'edit', recipeId: id}});
            });
            window.ee.addListener('Recipe.publish', function(obj) {
                let nextRecipeList = self.state.recipeList.clone();
                nextRecipeList[obj.id] || (obj.id = nextRecipeList.push() - 1);

                nextRecipeList[obj.id].name = obj.name;
                nextRecipeList[obj.id].ingredients = obj.ingredients.clone();
                nextRecipeList[obj.id].instructions = obj.instructions;
                nextRecipeList[obj.id].date = 'today ZZZ';
                
                self.setState({
                    recipeList: nextRecipeList, 
                    pageNavigator: {currentView: 'list', recipeId: -1}
                });
            });
            window.ee.addListener('Recipe.cancel', function() {
                self.setState({pageNavigator: {currentView: 'list', recipeId: -1}});
            });
        }
        componentWillUnmount() {
            window.ee.removeListener('Recipe.remove');
            window.ee.removeListener('Recipe.edit');
            window.ee.removeListener('Recipe.publish');
            window.ee.removeListener('Recipe.cancel');
        }
        render() {
            let recipeList = this.state.recipeList,
            currentView = this.state.pageNavigator.currentView,
            recipeId = this.state.pageNavigator.recipeId;
            return (
                <section>
                <PageHeader />
                { (currentView === 'list') && <RecipeList recipeList={recipeList}/> }
                { (currentView === 'edit') && <RecipeEditor recipeId={recipeId} recipe={recipeList[recipeId]}/> }
                </section>
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

    ReactDOM.render(
        <App />,
        document.getElementById('root')
        );

}());