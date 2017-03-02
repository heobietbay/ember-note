import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('employeetype');
    },
    actions: {
        add: function() {
            var employeeType = this.store.createRecord('employeetype', {
                name: this.controller.get('name')
            });
            console.log('About to save employeeType', employeeType);
            employeeType.save().then(() => {
                console.log('save successful');
                this.controller.set('name', null);
                this.refresh();
            }, function() {
                console.log('save failed');
            });
        }
    }
});
