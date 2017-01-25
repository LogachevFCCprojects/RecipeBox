import React from 'react';
import ReactDOM from 'react-dom';

import EditorIngredients from './EditorIngredients';

class RecipeEditor extends React.Component {
  static defaultProps = {
    recipe: {
      id: -1,
      name: '',
      ingredients: [
        {
          name: '',
          amount: '',
          measure: '',
        }
      ],
      instructions: '',
    }
  };

  state = this.props.recipe;

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
      console.log('remove', id);
      let nextList = this.state.ingredients.clone();
      nextList.splice(id, 1);
      console.log(nextList);
      this.setState({
        ingredients: nextList
      });
    });
    // event
    window.ee.addListener('Ingredient.add', (id) => {
      let nextList = this.state.ingredients.clone();
      nextList.push({
        name: '',
        amount: '',
        measure: '',
      });
      this.setState({
        ingredients: nextList
      });
    });
    // event
    window.ee.addListener('Ingredient.update', (obj) => {
      let nextList = this.state.ingredients.clone();
      nextList[obj.id] = {
        name: obj.name,
        amount: obj.amount,
        measure: obj.measure,
      };
      this.setState({
        ingredients: nextList
      });
    });
  }
  removeEventListeners() {
    window.ee.removeListener('Ingredient.remove');
    window.ee.removeListener('Ingredient.update');
    window.ee.removeListener('Ingredient.add');
  }
  updateInputElements() {
    ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
    ReactDOM.findDOMNode(this.refs.instructions).value = this.state.instructions;
  }

  onAnyFieldChange = (e) => {
    this.setState({
      name: ReactDOM.findDOMNode(this.refs.name).value,
      instructions: ReactDOM.findDOMNode(this.refs.instructions).value
    });
  };
  onSaveClick = (e) => {
    e.preventDefault();
    let obj = {
      id: this.props.recipeId,
      name: ReactDOM.findDOMNode(this.refs.name).value,
      ingredients: this.state.ingredients.clone(),
      instructions: ReactDOM.findDOMNode(this.refs.instructions).value,
    };
    window.ee.emit('Recipe.publish', obj);
  };
  onCancelClick = (e) => {
    e.preventDefault();
    window.ee.emit('Recipe.cancel');
  };

  render() {
    return (
      <div className="recipe-editor">
        <h1 className="recipe__name">
                      <input type='text' onChange={ this.onAnyFieldChange } placeholder='Recipe name' ref='name'/>
                      </h1>
        <EditorIngredients ingredients={ this.state.ingredients } />
        <h3>Instructions:</h3>
        <textarea className='recipe__instructions' onChange={ this.onAnyFieldChange } placeholder='Recipe instructions' ref='instructions'></textarea>
        <div className="recipe__controls">
          <button onClick={ this.onSaveClick } className="blue">Save</button>
          <button onClick={ this.onCancelClick } className="grey float-right">Cancel</button>
        </div>
      </div>
      );
  }
}

export default RecipeEditor;