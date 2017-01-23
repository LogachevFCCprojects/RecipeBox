import React from 'react';
import ReactDOM from 'react-dom';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import RecipeControls from './RecipeControls';

class SingleRecipe extends React.Component {
    	formattedDate(dateIsoString) {
    		let tempDate = new Date(Date.parse(dateIsoString));
    		let dd = tempDate.getDate();
    		(dd < 10) && (dd = '0' + dd);
			let mm = tempDate.getMonth() + 1;
			(mm < 10) && (mm = '0' + mm);
			let yy = tempDate.getFullYear() % 100;
			(yy < 10) && (yy = '0' + yy);
			return dd +'.'+ mm +'.'+ yy;
    	}
        render() {
            let {recipe: {name, ingredients, instructions, date}, recipeId} = this.props;
            return (
                <div className="recipe" >
                    <h1 className="recipe__name" >{name}</h1>
                    <Ingredients ingredients={ingredients} />
                    <Instructions instructions={instructions} />
                    <p className="recipe__date" >{this.formattedDate(date)}</p>
                    <RecipeControls recipeId={recipeId} />
                </div>
                );
        }
    }

export default SingleRecipe;