const { EntitySchema } = require('typeorm');

const MrrMetrics = new EntitySchema({
    name: 'MrrMetrics',
    tableName: 'mrr_metrics',
    schema: 'analytics',
    columns: {
        metric: {
            primary: true,
            type: 'varchar',
            nullable: false,
            length: 255
        },
        last_month: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        this_month: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        percentage_change: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
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
module.exports = MrrMetrics;