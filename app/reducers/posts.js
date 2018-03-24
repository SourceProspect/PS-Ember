import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  filter: undefined,
  all: undefined,
  registration: {
    UserName: 'bob'
  }
};

export default function posts(state, action) {
  switch (action.type) {
    case 'POSTS:FETCH_API': {
      console.log('\n\n\n POSTS:FETCH_API', {state}, {action},{initialState})
      const children = action.payload.data.children.map(child => child.data);
      const all = _.keyBy(children, post => post.id);
      return {
        ...state,
        all: {...state.all, ...all}
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
      console.log('\n\n\n POSTS:REGISTRATION', {state}, {action},{initialState})
      const {registration} = state;
      const {UserName} = registration;
      const input = action.args[0];
      const inputTarget = input.target.id;
      const inputValue = input.target.value;

      const retState = {
        ...state,
        filter: action.author,
        ...{registration:{[inputTarget]: inputValue}}
      }
      console.log('\n\n\n POSTS:REGISTRATION', {retState}, {action},{initialState})
      return retState;
    }

    default: {
      console.log('\n\n\n default', {initialState})
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
