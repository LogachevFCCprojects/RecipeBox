import React from 'react';

    class Instructions extends React.Component {
        render() {
            let instructionsTemplate = '',
                instructionsArray = this.props.instructions.split('\n');
            instructionsTemplate = instructionsArray.map((item, index) => <p key={index}>{item}</p>)
            return (
                <div className="recipe__instructions">
                <h3>Instructions: </h3>
                    {instructionsTemplate}
                </div>
            );
        }
    }

    Instructions.propTypes = {
        instructions: React.PropTypes.string,
    }

    Instructions.defaultProps = {
        instructions: 'No instructions passed',
    }

export default Instructions;