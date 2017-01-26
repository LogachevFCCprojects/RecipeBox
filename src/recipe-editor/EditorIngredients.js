import React from 'react';

import EditorSingleIngredient from './EditorSingleIngredient';

class EditorIngredients extends React.Component {
  onAddIngredientClick = (e) => {
    e.preventDefault();
    window.ee.emit('Ingredient.add');
  };
  render() {
    let template;
    if (this.props.ingredients.size) {
      template = this.props.ingredients.map(function(item, index) {
        return <EditorSingleIngredient ingredient={ item } id={ index } key={ index } />
      })
    }
    return (
      <div>
        <table className="allingredients">
          <tbody className="allingredients__body">
            { template }
          </tbody>
        </table>
        <div className="meta">
          <a onClick={ this.onAddIngredientClick } className="green">
            <i className="icon-add"></i>Add one more Ingredient
          </a>
        </div>
      </div>
      );
  }
}

export default EditorIngredients;