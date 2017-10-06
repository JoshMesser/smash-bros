import Ember from 'ember';

const { assert, isArray } = Ember;

export function includes([arr, val]/*, hash*/) {
  assert('Param 1 should be a array', isArray(arr));

  return arr.includes(val);
}

export default Ember.Helper.helper(includes);
