import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';

const stateToComputed = state => {
  console.log('\n\n\n stateToComputed', { state })
  return {
    posts: filterPosts(state),
    filter: state.posts.filter,
    registration: state.posts.registration,
    users: state.posts.users,
    loggedInUser: state.posts.loggedInUser,
  }
}

const dispatchToActions = dispatch => {
  return {
    filterWith: (author) => dispatch({ type: 'POSTS:FILTER_POSTS', author }),
    registrationAction: (...args) => dispatch({ type: 'POSTS:REGISTRATION', args }),
    registrationNewAction: (...args) => dispatch({ type: 'POSTS:REGISTRATION_NEW', args }),
    registrationLogInAction: (...args) => dispatch({ type: 'POSTS:LOGIN', args })
  }
}

export default connect(stateToComputed, dispatchToActions)();
