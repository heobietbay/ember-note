import Ember from 'ember';
import baseroute from '../base/baseroute';

export default baseroute.extend({
	renderTemplate: function() {
        this._super('employees');
    },
    model: function(){
    	return Ember.RSVP.hash({
            employeetypes: this.store.findAll('employeetype'),
            employees: this.store.findAll('employee')
        });
    },
    action: {
        add: function() {
            var employee = this.store.createRecord('employee', {
                name: this.controller.get('name')
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
