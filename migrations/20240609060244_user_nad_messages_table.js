/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments()
        table.string('name',64).notNullable()
        table.string('email',64).notNullable()
        table.string('contact',32)
        table.dateTime('created_at').notNullable()
        table.string('salt',32).notNullable()
        table.string('hash_password',128).notNullable()
    })
    .createTable('messages',(table)=>{
        table.increments()
        table.integer('sender_id').unsigned().references('users.id')
        table.integer('receiver_id').unsigned().references('users.id')
        table.string('contents',2048).notNullable()
        table.dateTime('sent_at').notNullable()
        table.dateTime('received_at').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messages')
            .dropTable('users')
  
};
