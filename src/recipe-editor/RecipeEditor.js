import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import EditorIngredients from './EditorIngredients';

// This module is responsible for:
// • Checking all new incoming data before submission (?)
// • Managing unsaved list of ingredients

// This module can not touch global data structure

class RecipeEditor extends React.Component {
  static defaultProps = {
    recipe: Immutable.fromJS({
      name: '',
      ingredients: [
        {
          name: '',
          amount: '',
          measure: '',
        }
      ],
      instructions: '',
    })
  };

  state = {
    recipe: this.props.recipe
  };

  componentDidMount() {
    this.addEventListeners(this);
    this.updateInputElements(this);
  }
  componentDidUpdate() {
    this.updateInputElements(this);
  }
  componentWillUnmount() {
    this.removeEventListeners(this);
  }

  addEventListeners() {
    // event
    window.ee.addListener('Ingredient.remove', (id) => {
      let list = this.state.recipe.updateIn(['ingredients'], (arr) => (arr.splice(id, 1)));
      this.setState({
        ingredients: list
      });
    });
    // event
    window.ee.addListener('Ingredient.add', (id) => {
      let emptyMap = Immutable.fromJS({
        name: '',
        amount: '',
        measure: ''
      });
      let nextList = this.state.recipe.updateIn(['ingredients'], list => list.push(emptyMap));
      this.setState({
        recipe: nextList
      });
    });
    // event
    window.ee.addListener('Ingredient.update', (obj, id) => { // obj is Map
      let list = this.state.recipe.setIn(['ingredients', id], obj);
      this.setState({
        ingredients: list
      });
    });
  }
  removeEventListeners() {
    window.ee.removeListener('Ingredient.remove');
    window.ee.removeListener('Ingredient.update');
    window.ee.removeListener('Ingredient.add');
  }
  updateInputElements() {
    ReactDOM.findDOMNode(this.refs.name).value = this.state.recipe.get('name');
    ReactDOM.findDOMNode(this.refs.instructions).value = this.state.recipe.get('instructions');
  }

  onAnyFieldChange = (e) => {
    console.log(ReactDOM.findDOMNode(this.refs.name).value);
    this.setState({
      name: ReactDOM.findDOMNode(this.refs.name).value,
      instructions: ReactDOM.findDOMNode(this.refs.instructions).value
    });
  };
  onSaveClick = (e) => {
    e.preventDefault();
    let obj = Immutable.fromJS({
      name: this.state.recipe.get('name'),
      ingredients: this.state.recipe.get('ingredients'), // ingredients is List
      instructions: this.state.recipe.get('instructions')
    });
    window.ee.emit('Recipe.publish', obj, this.props.recipeId); // obj is Map
  };
  onCancelClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.cancel');
  };

  render() {
    // console.log('RecipeEditor', obj.get('id'));
    return (
      <div className="recipe-editor">
        <div className="recipe__name">
          <input type='text' onChange={ this.onAnyFieldChange } placeholder='Recipe name' ref='name' />
        </div>
        <EditorIngredients ingredients={ this.state.recipe.get('ingredients') } />
        <h3>Instructions:</h3>
        <textarea className='recipe__instructions' onChange={ this.onAnyFieldChange } placeholder='Describe how to cook it' ref='instructions'>
        </textarea>
        <div className="recipe__controls">
          <button onClick={ this.onSaveClick } className="blue">Save</button>
          <button onClick={ this.onCancelClick } className="grey float-right">Cancel</button>
        </div>
      </div>
      );
  }
}

export default RecipeEditor;