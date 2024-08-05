const { EntitySchema } = require('typeorm');

const CustomerOrganization = new EntitySchema({
    name: 'CustomerOrganization',
    tableName: 'customer_organization',
    schema: 'core',
    columns: {
        customer_id: {
            type: 'uuid',
            nullable: false
        },
        org_id: {
            type: 'uuid',
            nullable: false
        },
        created_at: {
            type: 'timestamp',
            nullable: false,
            default: () => 'CURRENT_TIMESTAMP'
        },
        updated_at: {
            type: 'timestamp',
            nullable: false,
            default: () => 'CURRENT_TIMESTAMP'
        },
        deleted_at: {
            type: 'timestamp',
            nullable: true,
            default: () => 'NULL'
        }
    }
});
module.exports = Organization;