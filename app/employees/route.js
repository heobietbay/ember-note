import Ember from 'ember';
import baseroute from '../base/baseroute';

export default baseroute.extend({
    renderTemplate: function() {
        this._super('employees');
    },
    model: function() {
        return Ember.RSVP.hash({
            employeetypes: this.store.findAll('employeetype'),
            employees: this.store.findAll('employee')
        });
    },

    setupController(controller, model) {
        controller.set('employeeType', model.employeetypes.objectAt(0));
        this._super(controller, model);
    },
    actions: {
        setEmployeeType(value /*, event */ ) {
            console.log(value);
            this.controller.set('employeeType', value);
        },
        add: function() {
            var employee = this.store.createRecord('employee', {
                name: this.controller.get('name'),
                employeeType: this.controller.get('employeeType')
            });
            console.log('About to save employee', employee);
            employee.save().then(() => {
                console.log('save successful');
                this.controller.set('name', null);
                this.refresh();
            }, function() {
                console.log('save failed');
            });
        }
    }

});
