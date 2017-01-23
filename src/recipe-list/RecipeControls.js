import React from 'react';

class RecipeControls extends React.Component {
        static defaultProps = {
            recipeId: -1,
        };

        state = this.props;

        onRemoveClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.remove', this.state.recipeId);
        }

        onEditClick = (e) => {
            e.preventDefault();
            window.ee.emit('Recipe.edit', this.state.recipeId);
        }

        render() {
            return (
                <div className="recipe__controls">
                <button onClick={this.onEditClick} className="blue">Edit</button>
                <button onClick={this.onRemoveClick} className="grey float-right">X</button>
                </div>
                );
        }
    }

export default RecipeControls;