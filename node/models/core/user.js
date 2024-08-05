const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'user',
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
        email: {
            type: 'varchar',
            length: 255,
            unique: true,
            nullable: false
        },
        password: {
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
module.exports = User;