//action creators file

import actions from './actionTypes';

let nextListId = 0;
let nextListIndex = 0;
let nextCardId = 0;

// ACTIONS TO CONTROL LISTS INTERACTION

export const addList = (title) => {
    return {
        type: actions.ADD_LIST,
        id: nextListId++,
        index: nextListIndex,
        title: title
    };
};

export const removeList = (id) => {
    return {
        type: actions.REMOVE_LIST,
        id: id
    };
};

export const renameList = (id, newTitle) => {
    return {
        type: actions.RENAME_LIST,
        id: id,
        title: newTitle
    };
};

export const moveList = (id, indexToPlaceAt) => {
    return {
        type: actions.MOVE_LIST,
        id: id,
        index: indexToPlaceAt
    };
};

// ACTIONS TO CONTROL CARDS INTERACTIONS

export const addCard = (title, parentID) => {
    return {
        type: actions.ADD_CARD,
        id: nextCardId++,
        title: title,
        parentID: parentID
    };
};

export const removeCard = (id) => {
    return {
        type: actions.REMOVE_CARD,
        id: id
    };
};

export const removeAllCardsFromList = (parentID) => {
    return {
        type: actions.REMOVE_ALL_CARDS_FROM_LIST,
        parentID: parentID
    }
};

export const renameCard = (id, newTitle) => {
    return {
        type: actions.RENAME_CARD,
        id: id,
        title: newTitle
    };
};

export const moveCard = (id, parentID, hoveredItemID, draggedItemIndex, hoveredItemIndex, isMovedToAnotherList) => {
    return {
        type: actions.MOVE_CARD,
        id: id,
        parentID: parentID,
        hoveredItemID: hoveredItemID,
        draggedItemIndex: draggedItemIndex,
        hoveredItemIndex: hoveredItemIndex,
        isMovedToAnotherList: isMovedToAnotherList
    };
};

export default {
    addList,
    removeList,
    renameList,
    moveList,
    addCard,
    removeCard,
    renameCard,
    moveCard
};