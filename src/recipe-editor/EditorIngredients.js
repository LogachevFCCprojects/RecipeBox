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
    } else {
      template = <p>No ingredients in this recipe</p>
    }
    console.log('list renders');
    return (
      <div>
        <table className="allingredients">
          <tbody className="allingredients__body">
            { template }
          </tbody>
        </table>
        <button onClick={ this.onAddIngredientClick } className="green"><i className="icon-add"></i>Add one more Ingredient</button>
      </div>
      );
  }
}

export default EditorIngredients;