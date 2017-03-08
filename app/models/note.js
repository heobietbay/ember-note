import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    notebook: DS.belongsTo('notebook'),
    totalLength: Ember.computed('title', 'body', function() {
    	let title = this.get('title');
    	let body = this.get('body');

    	var len = (title || { length :  0 }).length + (body || { length :  0 }).length ;

        return len;
    })
});
