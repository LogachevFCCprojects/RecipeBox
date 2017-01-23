import React from 'react';

class SingleIngredient extends React.Component {
        render() {
            let {name, amount, measure} = this.props.ingredient
            return (
                <tr className="ingredient">
                <td className="ingredient__name" >{name}</td>
                <td className="ingredient__amount digits" >{amount}</td>
                <td className="ingredient__measure" >{measure}</td>
                </tr>
                )
        }
    }

export default SingleIngredient;