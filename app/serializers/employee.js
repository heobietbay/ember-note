import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    primaryKey: 'id',

    /*
	For some reason, currently the default serializer will treat relationship employee type as 'employee-type'
	It should be 'employeeType'.
	Need to override the keyForRelationship, and simply return the passed in key.
    */
    keyForRelationship(key) {
        return key; 
    }
});
