import React from 'react';

const IngredientsHeading = () => {
  return (
    <thead className="allingredients__heading">
      <tr>
        <th>Ingredient</th>
        <th className="digits">Amount</th>
        <th>Measure</th>
      </tr>
    </thead>
  )
}

export default IngredientsHeading;