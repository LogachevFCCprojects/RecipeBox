import React from 'react';

import SingleRecipe from './SingleRecipe';

class RecipeList extends React.Component {
        onAddRecipeClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.edit', -1);
        };
        render() {
            console.dir(this.props.recipeList.get(0).get('name'));
            let template;
            if (this.props.recipeList.size) {
                template = this.props.recipeList.map((item, index) => {
                    return (
                        <SingleRecipe recipeId={index} recipe={item.get('name')} key={index}/>
                        )
                })
            } else {
                template = <p>No recipes yet</p>
            }

            return (
                <div className="recipe-list">
                <button onClick={this.onAddRecipeClick} className="green">+ Add new Recipe</button>
                {template}
                </div>
                );
        }
    }

export default RecipeList;