import React from 'react';
import EditorSingleIngredient from './EditorSingleIngredient';

    class EditorIngredients extends React.Component {
        onAddIngredientClick = (e) => {
            e.preventDefault();
            window.ee.emit('Ingredient.add');
        };
        render() {
            let {ingredients} = this.props;
            let ingredientsTemplate;
            if (ingredients.length) {
                ingredientsTemplate = ingredients.map(function(item, index) {
                    return (
                        <EditorSingleIngredient {...item} id={index} key={index} />
                        )
                })
            } else {
                ingredientsTemplate = <p>No ingredients in this recipe</p>
            }

            return (
                <div>
                <table className="allingredients">
                   {/* <IngredientsHeading/>*/}
                    <tbody className="allingredients__body">
                        {ingredientsTemplate}
                        
                    </tbody>
                </table>
                <button onClick={this.onAddIngredientClick} className="green">+ Add one more Ingredient</button>
                </div>
                );
        }
    }

export default EditorIngredients;