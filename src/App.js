import React from 'react';
import Immutable from 'immutable';

import PageHeader from './PageHeader';
import RecipeList from './recipe-list/RecipeList';
//import RecipeEditor from './recipe-editor/RecipeEditor';
import initialRecipeList from './initial-data';

// This module holds:
// data structure, local storage, routes, custom event handlers

class App extends React.Component {
  constructor(state) {
    super(state);
    //maybe here read local storage 

    // sort array (mutatees, don't use with React.Component.state)    
    // this.arraySortByDateField(initialRecipeList);
    this.state = {
      recipeList: Immutable.fromJS(initialRecipeList),
      route: {
        current: 'list'
      }
    };
  }

  componentDidMount() {
    this.addEventListeners(this);
  }
  componentWillUnmount() {
    this.removeEventListeners(this);
  }
  addEventListeners() {
    // event
    // window.ee.addListener('Recipe.remove', (id) => {
    //     console.info('Удаляем рецепт', id);
    //     let nextList = this.state.recipeList.clone();
    //     nextList.splice(id, 1);
    //     this.setState({recipeList: nextList});
    // });
    // event
    window.ee.addListener('Recipe.edit', (id) => {
      this.setState({
        route: {
          current: 'edit',
          recipeId: id
        }
      });
    });
    // event
    // window.ee.addListener('Recipe.publish', (obj) => {
    //     let targetIndex = obj.id,
    //         d = new Date(),
    //         nextRecipeList = this.state.recipeList.clone();
    //     // check index and edit array item
    //     nextRecipeList[targetIndex] || (targetIndex = nextRecipeList.push());
    //     nextRecipeList[targetIndex] = {
    //         name: obj.name,
    //         ingredients: obj.ingredients.clone(),
    //         instructions: obj.instructions,
    //         date: d.toISOString(),
    //     };     
    //     // sort array (mutes, don't use with React.Component.state)    
    //     this.arraySortByDateField(nextRecipeList);
    //     // flush
    //     this.setState({recipeList: nextRecipeList, route: {current: 'list'}});
    // });
    // event
    window.ee.addListener('Recipe.cancel', () => {
      this.setState({
        route: {
          current: 'list'
        }
      });
    });
  }
  removeEventListeners() {
    window.ee.removeListener('Recipe.remove');
    window.ee.removeListener('Recipe.edit');
    window.ee.removeListener('Recipe.publish');
    window.ee.removeListener('Recipe.cancel');
  }
  arraySortByDateField(arrayToSort) {
    // mutes, don't use with React.Component.state
    // переписать
    // return arrayToSort.sort((a, b) => {
    //     let date1 = new Date(Date.parse(a.date));
    //     let date2 = new Date(Date.parse(b.date));
    //     return date2 - date1;
    // });  
  }

  render() {
    let {recipeList, route: {current}} = this.state;
    // let {recipeList, route:{current, recipeId}} = this.state;
    return (
      <section>
        <PageHeader />
        { (current === 'list') && <RecipeList recipeList={ recipeList } removeRecipe={ this.removeRecipe } /> }
        { /*(current === 'edit') && <RecipeEditor recipeId={recipeId} recipe={recipeList[recipeId]}/>*/ }
      </section>
      );
  }
}

export default App;