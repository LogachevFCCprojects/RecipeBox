import React from 'react';

class PageHeader extends React.Component{
        render() {
            return (
                <div className="page__title">
                    <h1>Recipe Box</h1>
                    <h2>Don't worry, all your recipes will be stored locally.</h2>

                    <em>Project by <a href="http://vladimirlogachev.ru" target="_blank" rel="noopener noreferrer">Vladimir Logachev</a>. </em>
                    <em>Made with React and SASS. <a href="https://github.com/LogachevFCCprojects/RecipeBox" target="_blank" rel="noopener noreferrer">Github</a></em>
                </div>
                )
        }
    }

export default PageHeader;