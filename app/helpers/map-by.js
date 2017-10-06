import Ember from 'ember';

const { assert, isArray } = Ember;

export function mapBy([ arr, key ]/*, hash*/) {
  assert('Param 1 should be a array', isArray(arr));

  return arr.mapBy(key);
}

export default Ember.Helper.helper(mapBy);
