const { EntitySchema } = require('typeorm');

const QuotationDetail = new EntitySchema({
    name: 'QuotationDetail',
    tableName: 'quotation_detail',
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
        quotation_header_id: {
            primary: true,
            type: 'uuid',
            nullable: false
        },
        product_id: {
            primary: true,
            type: 'uuid',
            nullable: false
        },
        quantity: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        price: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        unit: {
            type: 'varchar',
            length: 100,
            nullable: false
        },
        total: {
            type: 'numeric',
            precision: 13,
            scale: 4,
            default: 0
        },
        discount: {
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
    },
    relations: {
        product: {
            target: "Product",
            type: "many-to-one",
            joinColumn: { name: 'product_id' },
            cascade: false,
        },
        quotation_header: {
            target: "QuotationHeader",
            type: "many-to-one",
            joinColumn: { name: 'quotation_header_id' },
            cascade: false,
        },
    }
});
module.exports = QuotationDetail;