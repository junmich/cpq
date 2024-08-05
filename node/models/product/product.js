const { EntitySchema } = require('typeorm');

const Product = new EntitySchema({
    name: 'Product',
    tableName: 'product',
    schema: 'product',
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
        description: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        unit: {
            type: 'varchar',
            length: 100,
            nullable: false
        },
        category_id: {
            type: 'uuid',
            nullable: false
        },
        brand_id: {
            type: 'uuid',
            nullable: false
        },
        price: {
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
        category: {
            target: "Category",
            type: "many-to-one",
            joinColumn: { name: 'category_id' },
            cascade: false,
        },
        brand: {
            target: "Brand",
            type: "many-to-one",
            joinColumn: { name: 'brand_id' },
            cascade: false,
        },
    }
});

module.exports = Product;