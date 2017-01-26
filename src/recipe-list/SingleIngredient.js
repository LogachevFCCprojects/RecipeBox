import React from 'react';

class SingleIngredient extends React.Component {
  render() {
    let {ingredient} = this.props;
    return (
      <tr className="ingredient">
        <td className="ingredient__name">
          { ingredient.get('name') }
        </td>
        <td className="ingredient__amount digits">
          { ingredient.get('amount') }
        </td>
        <td className="ingredient__measure">
          { ingredient.get('measure') }
        </td>
      </tr>
    )
  }
}

export default SingleIngredient;