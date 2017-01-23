# Recipe Box #

### Task ###

1. Objective: Build a CodePen.io app that is functionally similar to this: [https://codepen.io/FreeCodeCamp/full/xVXWag/](https://codepen.io/FreeCodeCamp/full/xVXWag/]).
1. Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.
1. User Story: I can create recipes that have names and ingredients.
1. User Story: I can see an index view where the names of all the recipes are visible.
1. User Story: I can click into any of those recipes to view it.
1. User Story: I can edit these recipes.
1. User Story: I can delete these recipes.
1. User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.
1. Hint: You should prefix your local storage keys on CodePen, i.e. `_username_recipes`

## Installing development environment ##
1. Install **Node.js**
2. Execute `npm i --save-dev` in project directory to install all dependencies.
3. gulp must be also global
4. Finally, you will need to install some packages *globally*:

```sh
npm install -g eslint-config-react-app@0.3.0 eslint@3.8.1 babel-eslint@7.0.0 eslint-plugin-react@6.4.1 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-flowtype@2.21.0
```

## Watching & SASS##
Execute `gulp` in one sindow to start **Gulp** watching SASS.
Execute `npm start` and browser will open.

## Building ##
Execute `npm run build` and browser will open.

## Not only React... ##
Array.prototype.clone
Event Emitter