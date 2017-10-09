import Ember from 'ember';

export function sortBy([prop, arr]/*, hash*/) {
  return arr.sortBy(prop);
}

export default Ember.Helper.helper(sortBy);
