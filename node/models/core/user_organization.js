const { EntitySchema } = require('typeorm');

const UserOrganization = new EntitySchema({
    name: 'UserOrganization',
    tableName: 'user_organization',
    schema: 'core',
    columns: {
        user_org_key: {
            primary: true,
            type: 'varchar',
            length: 255,
            nullable: false
        },
        user_id: {
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
module.exports = UserOrganization;