import { connect } from 'react-redux';
import { removeList, renameList, moveList, removeAllCardsFromList } from '../actions';
import ListHolder from '../components/Lists-Holder';

const mapStateToProps = (state) => {
    return {
        lists: state.lists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveClick: (id) => {
            dispatch(removeList(id));
            dispatch(removeAllCardsFromList(id));
        },

        onRenameClick: (id, title) => {
            dispatch(renameList(id, title));
        },

        onMoveList: (id) => {
            dispatch(moveList(id, 0))
        }
    }
};

const AvailableLists = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListHolder);

export default AvailableLists;