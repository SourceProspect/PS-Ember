import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  filter: undefined,
  all: undefined,
  users: [
    { UserName: 'user1' },
    { UserName: 'user2', Password: 'pass123' },
  ],
  loggedInUser: {},
  registration: {
    UserName: '',
    Password: '',
    FirstName: ''
  },
};

export default function posts(state, action) {
  switch (action.type) {
    case 'POSTS:FETCH_API': {
      console.log('\n\n\n POSTS:FETCH_API', { state }, { action }, { initialState })
      const children = action.payload.data.children.map(child => child.data);
      const all = _.keyBy(children, post => post.id);
      return {
        ...state,
        all: { ...state.all, ...all }
      }
    }

    case 'POSTS:FILTER_POSTS': {
      if (state.filter === action.author) {
        return {
          ...state,
          filter: undefined
        }
      }
      return {
        ...state,
        filter: action.author
      }
    }

    case 'POSTS:REGISTRATION': {
      console.log('\n\n\n POSTS:REGISTRATION', { state }, { action }, { initialState })
      const { registration } = state;
      const input = action.args[0];
      const inputTarget = input.target.id;
      const inputValue = input.target.value;
      const retState = {
        ...state,
        filter: action.author,
        ...{
          registration: {
            ...registration,
            [inputTarget]: inputValue
          }
        }
      }
      console.log('\n\n\n POSTS:REGISTRATION', { retState }, { action }, { initialState })
      return retState;
    }

    case 'POSTS:REGISTRATION_NEW': {
      console.log('\n\n\n POSTS:REGISTRATION_NEW', { state }, { action }, { initialState })
      const { registration, users } = state;
      const retState = {
        ...state,
        filter: action.author,
        ...{ users: [...users, registration] },
        ...{ registration: {} },
      }
      console.log('\n\n\n POSTS:REGISTRATION_NEW', { retState }, { action }, { initialState })
      return retState;
    }

    case 'POSTS:LOGIN': {
      console.log('\n\n\n POSTS:LOGIN', { state }, { action }, { initialState })
      const { registration, users, loggedInUser } = state;
      const { UserName, Password } = registration;
      const match = users
        .filter(u => u.UserName === UserName)
        .filter(u => u.Password === Password)
        .length

      const retState = {
        ...state,
        filter: action.author,
        ...match && { loggedInUser: { UserName } },
      }
      console.log('\n\n\n POSTS:LOGIN', { retState }, { action }, { initialState })
      return retState;
    }

    case 'POSTS:CREATE': {
      console.log('\n\n\n POSTS:CREATE', { state }, { action }, { initialState })
      const { registration, users, loggedInUser } = state;

      const match = users
        .filter(u => u.UserName === loggedInUser.UserName)
      const nonMatch = users
        .filter(u => u.UserName !== loggedInUser.UserName)

      console.log('\n\n\n match', { match })
      console.log('\n\n\n nonMatch', { nonMatch })
      const retState = {
        ...state,
        filter: action.author,
        ...{
          users: [
            ...nonMatch,
            ...[{
              ...match[0],
              FirstName: state.registration.FirstName
            }]
          ]
        }
      }
      console.log('\n\n\n POSTS:CREATE', { retState }, { action }, { initialState })
      return retState;
    }

    default: {
      console.log('\n\n\n default', { initialState })
      return state || initialState;
    }
  }
}

const all = state => state.posts.all;
const filter = state => state.posts.filter;

export const filterPosts = createSelector(
  all,
  filter,
  (all, filter) => {
    return _.omitBy(all, post => {
      return filter === undefined ? false : post.author !== filter;
    });
  }
);
