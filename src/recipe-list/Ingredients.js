import React from 'react';
import IngredientsHeading from './IngredientsHeading';
import SingleIngredient from './SingleIngredient';

class Ingredients extends React.Component {
        render() {
            let ingredientsTemplate;
            let ingredients = this.props.ingredients;

            if (ingredients.length) {
                ingredientsTemplate = ingredients.map((item, index) => 
                	<SingleIngredient ingredient={item} key={index} />)
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

export default Ingredients;