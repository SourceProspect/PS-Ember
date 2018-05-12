import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

  const schools = [
    'Iowa State',
    'Loser Iowa', 
    'Boston',
    'Indian Hills'
  ];
const initialState = {
  filter: undefined,
  all: undefined,
  page: 'Login',
  registration: {},
  loggedInUser: {
    schoolSearchValue: '',
  },
  filteredSchools: schools,
  users: [
    { UserName: 'user1' },
    { UserName: 'user2', Password: 'pass123' },
    { UserName: 'user3', Password: 'pass123', FirstName: 'Joe' },
  ],
};

const nextPage = (page) => {
  switch (page) {
    case 'Login': {
      return 'Register'
    }
    case 'Register': {
      return 'Contact'
    }
    case 'Contact': {
      return 'Athletic'
    }
    case 'Athletic': {
      return 'Academic'
    }
    case 'Academic': {
      return 'Twitter'
    }
    case 'Twitter': {
      return 'Dashboard'
    }
    case 'Dashboard': {
      return 'Interest'
    }
    case 'Interest': {
      return 'Interest2'
    }
    default: {
      return 'Login'
    }
  }
}

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
        ...{ page: 'Register' },
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

      const nonMatch = users
        .filter(u => u.UserName !== loggedInUser.UserName)

      const retState = {
        ...state,
        filter: action.author,
        ...match.length && { loggedInUser: { UserName } },
        ...{
          registration: {
            ...registration,
            FirstName: match[0].FirstName,
          }
        },
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
        ...{ page: nextPage(state.page) },
        ...{ loggedInUser: { UserName: registration.UserName } },
        ...{
          users: [
            ...nonMatch,
            ...[{
              ...match[0],
              ...state.registration,
            }]
          ]
        }
      }
      console.log('\n\n\n POSTS:CREATE', { retState }, { action }, { initialState })
      return retState;
    }
    case 'POSTS:INTEREST': {
      const { loggedInUser } = state;
      const input = action.args[0].target.id;
      console.log('\n\n\n POSTS:INTEREST', { state }, { action }, { initialState }, {input})
      const currentValue = loggedInUser[input];
      console.log('\n\n\n POSTS:INTEREST', { currentValue  })
      return {
        ...state,
        ...{ page: nextPage(state.page) },
        ...{loggedInUser:{
          ...loggedInUser,
          [input]: !!loggedInUser[input] ? currentValue+1 : 1
          }
        }
      }
    }
    case 'POSTS:SEARCH_SCHOOL': {
      const { loggedInUser } = state;
      const schoolSearchValue = action.args[0].target.value;
      console.log('\n\n\n POSTS:SEARCH_SCHOOL', { state }, { action },{schoolSearchValue})
      console.log('\n\n\n POSTS:SEARCH_SCHOOL', { state})
      console.log({schoolSearchValue})
      const filteredSchools = schoolSearchValue.length >= 1 ? 
      schools.filter(
        school=>school.toLowerCase().indexOf(schoolSearchValue.toLowerCase()) > -1
      ) 
      : schools;
      console.log({filteredSchools})
      const retState = {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          schoolSearchValue
        },
        filteredSchools 
      }
      console.log('\n\n\n POSTS:SEARCH_SCHOOL', { retState})
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
