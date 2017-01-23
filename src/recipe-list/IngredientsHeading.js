import React from 'react';
import ReactDOM from 'react-dom';

class IngredientsHeading extends React.Component {
        render() {
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
    }

export default IngredientsHeading;