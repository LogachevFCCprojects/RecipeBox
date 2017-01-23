import React from 'react';
import ReactDOM from 'react-dom';
import SingleRecipe from './SingleRecipe';

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
                <button onClick={this.onAddRecipeClick} className="green">+ Add new Recipe</button>
                {RecipeListTemplate}
                </div>
                );
        }
    }

export default RecipeList;