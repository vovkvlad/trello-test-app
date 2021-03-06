import actionTypes from '../actions/actionTypes'
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

// This is really straightforward implementation of reordering cards after moving
// it is just reassigning index from 1 to cards.length, so that there is no gaps in indexes after card was moved out
const reorderCardsInList = (cards) => {
    let startingIndex = 1;

    forEach(cards, (card) => {
        card.index = startingIndex++;
    });
};

// this map is used to define index of card inside List
// as my initial idea to keep state normalized (to make 2 separate
// arrays list:[] and cards:[]) do not really fit into drag and drop scheme
// I do not want to do it like { lists: [{cards:[]}]} as it will bring coupling to the data
let parentIDIndexMap = {};

const card = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_CARD:
            if (parentIDIndexMap[ action.parentID ]) {
                parentIDIndexMap[ action.parentID ]++;
            } else {
                parentIDIndexMap[ action.parentID ] = 1;
            }

            return {
                id: action.id,
                title: action.title,
                parentID: action.parentID,
                index: parentIDIndexMap[ action.parentID ],
                cardColor: action.cardColor
            };

        case actionTypes.RENAME_CARD:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                title: action.title
            });

        case actionTypes.CHANGE_CARD_COLOR:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                cardColor: action.cardColor
            });

        default:
            return state;
    }
};

const cards = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_CARD:
            return [
                ...state,
                card(undefined, action)
            ];

        case actionTypes.RENAME_CARD:
            return state.map(cardItem => {
                return card(cardItem, action);
            });

        case actionTypes.REMOVE_CARD:
            // this should be ok as filter method return new array,
            // thus immutability restriction is not violated
            return state.filter(cardItem => {
                return cardItem.id !== action.id;
            });

        case actionTypes.REMOVE_ALL_CARDS_FROM_LIST:
            return state.filter(cardItem => {
                return cardItem.parentID !== action.parentID;
            });

        case actionTypes.MOVE_CARD:
            let tmpState = cloneDeep(state);

            let draggedElement = tmpState.find((card) => {
                return card.id === action.id;
            });

            let hoveredElement = tmpState.find((card) => {
                return card.id === action.hoveredItemID;
            });

            if (action.isMovedToAnotherList) {
                draggedElement.parentID = hoveredElement.parentID;
                draggedElement.index = action.draggedItemIndex;

                let cardArrayToMoveTo = sortBy(
                    filter(tmpState, (card)=> {
                        return card.parentID === hoveredElement.parentID;
                    }), 'index');

                reorderCardsInList(cardArrayToMoveTo);

                let cardArrayToMoveFrom = sortBy(
                    filter(tmpState, (card)=> {
                        return card.parentID === action.parentID;
                    }), 'index');

                reorderCardsInList(cardArrayToMoveFrom);

                return tmpState;
            } else {
                draggedElement.index = action.hoveredItemIndex;
                hoveredElement.index = action.draggedItemIndex;

                return tmpState;

            }

        case actionTypes.CHANGE_CARD_COLOR:
            return state.map(cardItem => {
                return card(cardItem, action);
            });

        default:
            return state;
    }
};

export default cards;
