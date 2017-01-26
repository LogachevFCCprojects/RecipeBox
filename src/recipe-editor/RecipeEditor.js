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
      let nextRecipe = this.state.recipe.updateIn(['ingredients'], (arr) => (arr.splice(id, 1)));
      this.setState({
        recipe: nextRecipe
      });
    });
    // event
    window.ee.addListener('Ingredient.add', (id) => {
      let emptyIngredient = Immutable.fromJS({
        name: '',
        amount: '',
        measure: ''
      });
      let nextRecipe = this.state.recipe.updateIn(['ingredients'], list => list.push(emptyIngredient));
      this.setState({
        recipe: nextRecipe
      });
    });
    // event
    window.ee.addListener('Ingredient.update', (obj, id) => { // obj is Map
      console.log(`> update ingredient with id: ${id}`);
      let nextRecipe = this.state.recipe.setIn(['ingredients', id], obj);
      this.setState({
        recipe: nextRecipe
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

  onNameChange = (e) => {
    console.info(ReactDOM.findDOMNode(this.refs.name).value);
    //here add check input data
    let nextRecipe = this.state.recipe.setIn(['name'], ReactDOM.findDOMNode(this.refs.name).value);
    this.setState({
      recipe: nextRecipe
    });
  };
  onInstructionsChange = (e) => {
    console.info(ReactDOM.findDOMNode(this.refs.instructions).value);
    //here add check input data
    let nextRecipe = this.state.recipe.setIn(['instructions'], ReactDOM.findDOMNode(this.refs.instructions).value);
    this.setState({
      recipe: nextRecipe
    });
  };
  onSaveClick = (e) => {
    e.preventDefault();
    let obj = Immutable.fromJS({ // obj is Map
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
  onRemoveClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.remove', this.props.recipeId);
  };

  render() {
    console.log('editor renders');
    return (
      <div className="recipe-editor">
        <div className="recipe__name">
          <input type='text' onChange={ this.onNameChange } placeholder='Recipe name' ref='name' />
        </div>
        <EditorIngredients ingredients={ this.state.recipe.get('ingredients') } />
        <textarea className='recipe__instructions' onChange={ this.onInstructionsChange } placeholder='Describe how to cook it' ref='instructions'>
        </textarea>
        <div className="recipe__controls">
          <button onClick={ this.onSaveClick } className="blue"><i className="icon-submit"></i>Save</button>
          <button onClick={ this.onCancelClick } className="grey"><i className="icon-close"></i>Cancel</button>
          <button onClick={ this.onRemoveClick } className="red float-right"><i className="icon-remove"></i>Remove</button>
        </div>
      </div>
      );
  }
}

export default RecipeEditor;