import React from 'react';

import IngredientsHeading from './IngredientsHeading';
import SingleIngredient from './SingleIngredient';

class Ingredients extends React.Component {
  render() {
    let template;
    if (this.props.ingredients.size) {
      template = this.props.ingredients.map((item, index) => {
        return <SingleIngredient ingredient={ item } key={ index } />
      })
    } else {
      template = <p>No ingredients in this recipe</p>
    }

    return (
      <table className="allingredients">
        <IngredientsHeading/>
        <tbody className="allingredients__body">
          { template }
        </tbody>
      </table>
      );
  }
}

export default Ingredients;