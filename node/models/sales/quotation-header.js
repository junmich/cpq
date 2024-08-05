const { EntitySchema } = require('typeorm');

const QuotationHeader = new EntitySchema({
    name: 'QuotationHeader',
    tableName: 'quotation_header',
    schema: 'sales',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            nullable: false,
            generated: 'uuid',
            onUpdate: 'CASCADE',
            default: () => 'uuid_generate_v4()'
        },
        quotation_no: {
            type: 'varchar',
            length: 255,
            nullable: true
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
        contact_info: {
            type: 'varchar',
            length: 255,
            nullable: true
        },
        total_discount: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        total_amount: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        terms: {
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
    },
    relations: {
        quotation_details: {
            target: "QuotationDetail",
            type: "one-to-many",
            inverseSide: "quotation_header",
            cascade: false,
        }
    }
});
module.exports = QuotationHeader;