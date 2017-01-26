import React from 'react';
import Immutable from 'immutable';

import PageHeader from './PageHeader';
import RecipeList from './recipe-list/RecipeList';
import RecipeEditor from './recipe-editor/RecipeEditor';
import initialRecipeList from './initial-data';

// This module is responsible for:
// • Data structure and sorting
// • Local storage
// • Routes
// • Custom event handlers

class App extends React.Component {
  state = {
    recipeList: this.arraySortByDateField(this.readLocalStorage()),
    route: {
      current: 'list'
    }
  };
  readLocalStorage() {
    //returns Immutable List
    try {
      //
      let str = localStorage.getItem('vladimirlogachev_recipebox');
      let arr = JSON.parse(str);
      let immutColl = Immutable.fromJS(arr);
      immutColl = this.arraySortByDateField(immutColl);
      return immutColl;
    } catch (err) {
      console.error(err);
    }
    console.info('Local Storage has no valid JSON for me ;-)');
    return this.arraySortByDateField(Immutable.fromJS(initialRecipeList));
  }
  writeLocalStorage(immutableCollection) {
    //accepts Immutable List
    localStorage.setItem('vladimirlogachev_recipebox', JSON.stringify(immutableCollection));
  }

  componentDidMount() {
    this.addEventListeners(this);
  }
  componentWillUnmount() {
    this.removeEventListeners(this);
  }
  addEventListeners() {
    // event
    window.ee.addListener('Recipe.remove', (id) => {
      let nextList = this.state.recipeList.splice(id, 1);
      this.writeLocalStorage(nextList);
      this.setState({
        recipeList: nextList,
        route: {
          current: 'list'
        }
      });
    });
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
    window.ee.addListener('Recipe.add', () => {
      this.setState({
        route: {
          current: 'add'
        }
      });
    });
    // event
    window.ee.addListener('Recipe.publish', (obj, id) => { //obj is Map(List(Map))
      // set new date
      let d = new Date();
      obj = obj.set('date', d.toISOString());
      // insert Recipe
      let list = this.state.recipeList;
      if (id === -1) {
        list = list.push(obj);
      } else {
        list = list.set(id, obj);
      }
      // sort Recipe List
      list = Immutable.fromJS(this.arraySortByDateField(list));
      // flush
      this.writeLocalStorage(list);
      this.setState({
        recipeList: list,
        route: {
          current: 'list'
        }
      });
    });
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
    window.ee.removeListener('Recipe.add');
    window.ee.removeListener('Recipe.publish');
    window.ee.removeListener('Recipe.cancel');
  }
  arraySortByDateField(arrayToSort) {
    return arrayToSort.sort((a, b) => {
      let date1 = new Date(Date.parse(a.get('date')));
      let date2 = new Date(Date.parse(b.get('date')));
      return date2 - date1;
    });
  }

  render() {
    let {recipeList, route: {current, recipeId}} = this.state;
    return (
      <section>
        <PageHeader />
        { (current === 'list') && <RecipeList recipeList={ recipeList } removeRecipe={ this.removeRecipe } /> }
        { (current === 'edit') && <RecipeEditor recipeId={ recipeId } recipe={ recipeList.get(recipeId) } /> }
        { (current === 'add') && <RecipeEditor /> }
      </section>
      );
  }
}

export default App;