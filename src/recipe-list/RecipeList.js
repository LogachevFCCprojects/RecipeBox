import React from 'react';

import SingleRecipe from './SingleRecipe';

class RecipeList extends React.Component {
  componentDidMount() {
    window.ee.emit('Recipe.show', 0);
  }
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
        <div onClick={ this.onAddRecipeClick } className="recipe recipe--mockup">
          <a onClick={ this.onAddRecipeClick } className="green"><i className="icon-list-add"></i>Add new Recipe</a>
        </div>
        { template }
      </div>
      );
  }
}

export default RecipeList;