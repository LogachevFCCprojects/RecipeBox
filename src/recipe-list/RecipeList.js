import React from 'react';

import SingleRecipe from './SingleRecipe';

class RecipeList extends React.Component {
  onAddRecipeClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.add');
  };
  render() {
    let template;
    if (this.props.recipeList.size) {
      template = this.props.recipeList.map((item, index) => <SingleRecipe recipeId={ index } recipe={ item } key={ index } />)
    } else {
      template = <p>No recipes yet</p>
    }

    return (
      <div className="recipe-list">
        <button onClick={ this.onAddRecipeClick } className="green"><i className="icon-add"></i> Add new Recipe</button>
        { template }
      </div>
      );
  }
}

export default RecipeList;