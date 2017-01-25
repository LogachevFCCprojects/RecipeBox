import React from 'react';

class Instructions extends React.Component {
  render() {
    let instructionsArray = this.props.instructions.split('\n');
    let template = instructionsArray.map((item, index) => {
      return (<p key={ index }>
                { item }
              </p>)
    });
    return (
      <div className="recipe__instructions">
        <h3>Instructions: </h3>
        { template }
      </div>
      );
  }
}

Instructions.propTypes = {
  instructions: React.PropTypes.string,
}

export default Instructions;