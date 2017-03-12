import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
            filerName: null,
            employeeTypes: this.store.findAll('employeetype'),
            filterEmployeeTypes: Ember.computed('filterName', function() {
                let filterName = this.filterName ? this.filterName.trim() : null;
                return this.employeeTypes.filter(function(singleRecord) {
                    let name = singleRecord.get('name').toUpperCase();
                    console.log(name);
                    return !filterName ? true : name.indexOf(filterName.toUpperCase()) != -1;
                });
            })
        });
    },
    setupController(controller, model) {
        this._super(controller, model);
    },

    actions: {
        filterNameValueChange(event){
            Ember.set(this.currentModel,'filterName',event.currentTarget.value);
        },
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
