import Ember from 'ember';
import baseroute from '../base/baseroute';

let Boolean = Ember.Object.extend({
    value:true
});

export default baseroute.extend({
    renderTemplate: function() {
        this._super('employees');
    },
    model: function() {
        return Ember.RSVP.hash({
            employeetypes: this.store.findAll('employeetype'),
            employees: this.store.findAll('employee'),
            sortDefinition:Ember.computed('sortDesc.value',function(){
                let attribute = 'name';
                let order = this.sortDesc.get('value') ? 'desc' : 'asc';
                return [attribute + ':' + order];
            }),
            sortDesc: Boolean.create(),
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
        toogleSorting: function() {
            //TODO: why do we need Ember.set here?
           //Ember.set(this.currentModel,'sortDesc',!this.currentModel.sortDesc);
           this.currentModel.sortDesc.set('value',!this.currentModel.sortDesc.get('value'));
        },
        add: function() {
            var employee = this.store.createRecord('employee', {
                name: this.currentModel.name,
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
