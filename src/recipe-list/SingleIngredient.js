import React from 'react';

class SingleIngredient extends React.Component {
    render() {
        let {name, amount, measure} = this.props.ingredient;
        return (
            <tr className="ingredient">
            <td className="ingredient__name" >{name}</td>
            <td className="ingredient__amount digits" >{amount}</td>
            <td className="ingredient__measure" >{measure}</td>
            </tr>
            )
    }
}

SingleIngredient.propTypes = {
    data: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        skills: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
    })
};

export default SingleIngredient;