import Ember from 'ember';

export function outputDate([ date ]/*, hash*/) {
  const d = new Date(date);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const y = d.getFullYear();

  return `${m} / ${day} / ${y}`;
}

export default Ember.Helper.helper(outputDate);
