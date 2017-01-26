import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

class EditorSingleIngredient extends React.Component {
  static defaultProps = {
    possibleMeasures: ['g', 'ml', 'pcs']
  };
  componentDidMount() {
    this.updateInputElements(this);
  }
  componentDidUpdate() {
    this.updateInputElements(this);
  }
  updateInputElements() {
    ReactDOM.findDOMNode(this.refs.name).value = this.props.ingredient.get('name');
    ReactDOM.findDOMNode(this.refs.amount).value = this.props.ingredient.get('amount');
  }
  submitFieldValue(fieldName, fieldValue) {
    // prepare an object before changes // looks like anti-pattern...
    let nextObj = {
      name: this.props.ingredient.get('name'),
      amount: this.props.ingredient.get('amount'),
      measure: this.props.ingredient.get('measure')
    };

    // actually we update field Value here
    nextObj[fieldName] = fieldValue;

    // // CHANGE State anyway
    // this.setState({
    //   [fieldName]: fieldValue
    // });

    //why look for an object if we can lookup state?
    window.ee.emit('Ingredient.update', Immutable.fromJS(nextObj), this.props.id);
  }

  onNameChange = (e) => {
    this.submitFieldValue('name', e.currentTarget.value);
  };
  onAmountChange = (e) => {
    this.submitFieldValue('amount', e.currentTarget.value);
  };
  onMeasureChange = (e) => {
    this.submitFieldValue('measure', e.currentTarget.value);
  };
  onRemoveClick = (e) => {
    e.preventDefault();
    window.ee.emit('Ingredient.remove', this.props.id);
  };
  render() {
    let measure = this.props.ingredient.get('measure');
    let measuresTemplate = this.props.possibleMeasures.map((item, index) => {
      return (
        <label className="inline-radio" key={ index }>
          <input type="checkbox" name="measure" value={ item } checked={ measure === item } onChange={ this.onMeasureChange } />
          <span><em>{ item }</em></span>
        </label>
        );
    });
    console.log('single ingredient renders');
    return (
      <tr className="ingredient">
        <td className="ingredient__name">
          <input type='text' onChange={ this.onNameChange } placeholder='Ingredient name' ref='name' />
        </td>
        <td className="ingredient__amount">
          <input type='text' onChange={ this.onAmountChange } placeholder='amount' ref='amount' />
        </td>
        <td className="ingredient__measure">
          <fieldset>
            { measuresTemplate }
          </fieldset>
          <a onClick={ this.onRemoveClick } className="red"><i className="icon-remove"></i>Remove</a>
        </td>
      </tr>
    )
  }
}

export default EditorSingleIngredient;