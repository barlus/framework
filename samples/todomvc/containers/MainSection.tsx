import * as TodoActions from '../actions/index'
import { bindActionCreators, connect } from '@barlus/redux'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors/index'


const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)

