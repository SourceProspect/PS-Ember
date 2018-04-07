import { connect } from 'ember-redux';

const stateToComputed = state => {
  const {page} = state.posts;
  return {
    posts: {
      ...state.posts,
      ...{
        showLogin: page === 'Login',
        showRegister: page === 'Register',
        showContact: page === 'Contact',
        showAthletic: page === 'Athletic',
        showAcademic: page === 'Academic',
        showTwitter: page === 'Twitter',
        showProspectDashboard: page === 'Dashboard',
        showProspectInterest: page === 'Interest',
      }
    },
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
    registrationLogInAction: (...args) => dispatch({ type: 'POSTS:LOGIN', args }),
    creatProfile: (...args) => dispatch({ type: 'POSTS:CREATE', args }),
    interest: (...args) => dispatch({ type: 'POSTS:INTEREST', args })
  }
}

export default connect(stateToComputed, dispatchToActions)();
