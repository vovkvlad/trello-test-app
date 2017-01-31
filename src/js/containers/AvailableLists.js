import { connect } from 'react-redux';
import { removeList, renameList, moveList, removeAllCardsFromList } from '../actions';
import ListHolder from '../components/Lists-Holder';
import sortBy from 'lodash/sortBy';


const mapStateToProps = (state) => {
    return {
        lists: sortBy(state.lists, 'index')
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

        onMoveList: (id, hoveredItemID, draggedItemIndex, hoveredItemIndex) => {
            dispatch(moveList(id, hoveredItemID, draggedItemIndex, hoveredItemIndex))
        }
    }
};

const AvailableLists = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListHolder);

export default AvailableLists;