import React from 'react';
import ReactDOM from 'react-dom';

    class Instructions extends React.Component {
        render() {
            let instructionsTemplate;
            let instructionsArray = this.props.instructions.split('\n');
            instructionsTemplate = instructionsArray.map((item, index) => <p>{item}</p>)
            return (
                <div className="recipe__instructions">
                <h3>Instructions: </h3>
                    {instructionsTemplate}
                </div>
                );
        }
    }

export default Instructions;