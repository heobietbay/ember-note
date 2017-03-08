import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    primaryKey: 'id',

    serialize: function(snapshot, options) {
        var payLoadContent = this._super(snapshot, options).data;
        if (payLoadContent.relationships) {
            let relationships = payLoadContent.relationships;
            if (relationships["employee-type"]) {
            	var employeeType = relationships["employee-type"].data;
                //relationships["employeetype"] = relationships["employee-type"];

                if(employeeType)
                {
            		employeeType.employeeTypeId = employeeType.id;
            		delete employeeType.id;
                	payLoadContent.attributes["employeeType"] = employeeType;
                }
                delete payLoadContent.relationships;
            }
        }
        console.log({ data: payLoadContent });
        return { data: payLoadContent } ;
    }
});
