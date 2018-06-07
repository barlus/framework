import { bindActionCreators,connect } from '@barlus/redux';
import * as TodoActions from '../actions/index'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors/index'

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});


const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList
