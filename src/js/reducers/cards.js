import actionTypes from '../actions/actionTypes'


const card = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_CARD:
            return {
                id: action.id,
                title: action.title,
                parentID: action.parentID
            };
        case actionTypes.RENAME_CARD:
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

const cards = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_CARD:
            return [
                ...state,
                card(undefined, action)
            ];

        case actionTypes.RENAME_CARD:
            return state.map(listItem => {
                return card(listItem, action);
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
            return state;// will be fixed

        default:
            return state;
    }
};

export default cards;
