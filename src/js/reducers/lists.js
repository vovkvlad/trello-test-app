import actionTypes from '../actions/actionTypes'
import cloneDeep from 'lodash/cloneDeep';

const list = (state={}, action) => {
    switch (action.type) {
        case actionTypes.ADD_LIST:
            return {
                id: action.id,
                title: action.title,
                index: action.index
            };
        case actionTypes.RENAME_LIST:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                title: action.title
            });

        default:
            return state;
    }
};

const lists = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_LIST:
            return [
                ...state,
                list(undefined, action)
            ];

        case actionTypes.RENAME_LIST:
            return state.map(listItem => {
                return list(listItem, action);
            });

        case actionTypes.REMOVE_LIST:
            // this should be ok as filter method return new array,
            // thus immutability restriction is not violated
            return state.filter(listItem => {
                return listItem.id !== action.id;
            });

        case actionTypes.MOVE_LIST:
            let tmpState = cloneDeep(state);

            let draggedElement = tmpState.find((card) => {
                return card.id === action.id;
            });

            let hoveredElement = tmpState.find((card) => {
                return card.id === action.hoveredItemID;
            });

            draggedElement.index = action.hoveredItemIndex;
            hoveredElement.index = action.draggedItemIndex;

            return tmpState;

        default:
            return state;
    }
};

export default lists;