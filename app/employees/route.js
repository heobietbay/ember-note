import Ember from 'ember';
import baseroute from '../base/baseroute';

export default baseroute.extend({
    renderTemplate: function() {
        this._super('employees');
    },
    model: function() {
        return Ember.RSVP.hash({
            employeetypes: this.store.findAll('employeetype'),
            employees: this.store.findAll('employee'),
            sortDefinition:['name:desc'],
            sortedEmployeeTypes: Ember.computed.sort('employeetypes','sortDefinition' )
        });
    },

    afterModel(resolvedModel, transition) {
        this.modelFor(this.routeName).selectedEmployeeType = resolvedModel.employeetypes.objectAt(0);
    },

    setupController: function(controller, model) {
        this._super(controller,model);
    },

    actions: {
        setEmployeeType(value /*, event */ ) {
            console.log(value);
            this.modelFor(this.routeName).selectedEmployeeType = value;
        },
        add: function() {
            var employee = this.store.createRecord('employee', {
                name: this.controller.get('name'),
                employeeType: this.currentModel.selectedEmployeeType
            });
            console.log('About to save employee', employee);
            employee.save().then(() => {
                console.log('save successful');
                this.controller.set('name', null);
            }, function() {
                console.log('save failed');
            });
        }
    }

});
