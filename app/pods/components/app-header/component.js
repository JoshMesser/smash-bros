import Ember from 'ember';

const {
    inject: { service }
} = Ember;

export default Ember.Component.extend({
    session: service(),

    actions: {
        openSideNav() {
            this.sendAction('openSideNav');
        }
    }
});
