import {connect} from 'react-redux';
import {removeCard, renameCard, moveCard, changeCardColor} from '../actions';
import CardHolder from '../components/Cards-Holder';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

const mapStateToProps = (state, ownProps) => {
    let cards = sortBy(
        filter(state.cards, (card)=> {
            return card.parentID === ownProps.listID;
        }), 'index');

    return {
        cards: cards
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveClick: (id) => {
            dispatch(removeCard(id));
        },

        onRenameClick: (id, title) => {
            dispatch(renameCard(id, title));
        },

        onMoveCard: (id, parentID, hoveredItemID, draggedItemIndex, hoveredItemIndex, isMovedToAnotherList) => {
            dispatch(moveCard(id, parentID, hoveredItemID, draggedItemIndex, hoveredItemIndex, isMovedToAnotherList));
        },

        onChangeCardColor: (id, cardColor) => {
            dispatch(changeCardColor(id, cardColor));
        }
    }
};

const AvailableCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardHolder);

export default AvailableCards;
