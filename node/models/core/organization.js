const { EntitySchema } = require('typeorm');

const Organization = new EntitySchema({
    name: 'Organization',
    tableName: 'organization',
    schema: 'core',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            nullable: false,
            generated: 'uuid',
            onUpdate: 'CASCADE',
            default: () => 'uuid_generate_v4()'
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        address: {
            type: 'varchar',
            length: 255,
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