import { connect } from 'react-redux';
import { removeCard, renameCard, moveCard } from '../actions';
import CardHolder from '../components/Cards-Holder';

const mapStateToProps = (state, ownProps) => {
    return {
        cards: state.cards.filter((card) => {
            // return cards only of current parent list
            return card.parentID === ownProps.listID;
        })
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

        onMoveList: (id) => {
            dispatch(moveCard(id, 0))
        }
    }
};

const AvailableCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardHolder);

export default AvailableCards;
