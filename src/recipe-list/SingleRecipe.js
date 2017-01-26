import React from 'react';

import Ingredients from './Ingredients';
import Instructions from './Instructions';

class SingleRecipe extends React.Component {
  formattedDate(dateIsoString) {
    // accepts ISO string and returns dd.mm.yy
    let tempDate = new Date(Date.parse(dateIsoString));
    let dd = tempDate.getDate();
    (dd < 10) && (dd = '0' + dd);
    let mm = tempDate.getMonth() + 1;
    (mm < 10) && (mm = '0' + mm);
    let yy = tempDate.getFullYear() % 100;
    (yy < 10) && (yy = '0' + yy);
    return dd + '.' + mm + '.' + yy;
  }
  onRemoveClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.remove', this.props.recipeId);
  }

  onEditClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.edit', this.props.recipeId);
  }
  render() {
    let {recipe} = this.props;
    return (
      <div className="recipe">
        <h1 className="recipe__name">{ recipe.get('name') }</h1>
        <Ingredients ingredients={ recipe.get('ingredients') } />
        <Instructions instructions={ recipe.get('instructions') } />
        <p className="recipe__date">
          { this.formattedDate(recipe.get('date')) }
        </p>
        <div className="recipe__controls">
          <a onClick={ this.onEditClick } className="blue"><i className="icon-edit"></i>Edit</a>
          <a onClick={ this.onRemoveClick } className="red float-right"><i className="icon-remove"></i>Remove</a>
        </div>
      </div>
      );
  }
}

export default SingleRecipe;