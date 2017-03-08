import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',
    host: 'http://localhost:9999'

    /*createRecord: function(store, type, snapshot) {
        var data = this.serialize(snapshot, { includeId: true });
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'POST',
                url: `/${type.modelName}` + 's',
                dataType: 'json',
                data: data
            }).then(function(data) {
                Ember.run(null, resolve, data);
            }, function(jqXHR) {
                jqXHR.then = null; // tame jQuery's ill mannered promises
                Ember.run(null, reject, jqXHR);
            });
        });
    }*/
});
