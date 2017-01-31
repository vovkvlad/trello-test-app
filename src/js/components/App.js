import React, { Component } from 'react';
import AvailableLists from '../containers/AvailableLists';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class App extends Component {
    render() {
        return (
            <AvailableLists />
        );
    }
}
/*
const App = () => (
    <AvailableList />
    /!*<div className="app-container">

        {/!*<AddList
            cssClass="list-item add-list-item"
            placeholder="Add new List"
            buttonText="Add"
        />*!/}
    </div>*!/

);
*/

export default DragDropContext(HTML5Backend)(App);