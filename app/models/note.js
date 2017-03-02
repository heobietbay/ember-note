import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    notebook: DS.belongsTo('notebook'),
    totalLength: Ember.computed('title', 'body', function() {
        return this.get('title').length + this.get('body').length;
    })
});
