(function () {
    'use strict';

///
    var Header = React.createClass({
        render: function() {
            return (
                <div className="page__title">
                    <h1>Recipe Box</h1>
                    <h2>Don't worry, all your recipes will be stored locally.</h2>

                    <em>Project by <a href="http://vladimirlogachev.ru" target="_blank" rel="noopener noreferrer">Vladimir Logachev</a>. </em>
                    <em>Made with React and SASS. <a href="https://github.com/LogachevFCCprojects/RecipeBox" target="_blank" rel="noopener noreferrer">Github</a></em>
                </div>
                )
        }
    });

    var DisplaySingleIngredient = React.createClass({
        render: function() {
            return (
                <tr className="ingredient">
                    <td className="ingredient__name" >Water</td>
                    <td className="ingredient__amount digits" >25</td>
                    <td className="ingredient__measure" >ml</td>
                </tr>
                )
        }
    });

    var Ingredients = React.createClass({
        render: function() {
            var ingredients = [0,0,0,0,0,0];
            var ingredientsTemplate;

            if (ingredients.length > 0) {
                ingredientsTemplate = ingredients.map(function(item, index) {
                    return (
                        <DisplaySingleIngredient key={index} />
                        )
                })
            } else {
                ingredientsTemplate = <p>No ingredients in this recipe</p>
            }

            return (
                <section>
                <Header />
                <table className="allingredients">
                    <thead className="allingredients__heading">
                        <tr>
                            <th>Ingredient</th>
                            <th className="digits">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="allingredients__body">
                        {ingredientsTemplate}
                    </tbody>
                </table>
                </section>
                );
        }
    });

    ReactDOM.render(
	    <Ingredients />,
	    	document.getElementById('root')
    	);

}());