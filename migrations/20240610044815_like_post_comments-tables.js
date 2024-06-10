/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts',(table)=>{
        table.increments()
        table.integer('user_id').unsigned().references('users.id')
        table.string('post',1024).notNullable()
        table.string('descripton',2048)
    })
    .createTable('likes',(table)=>{
        table.increments()
        table.integer('user_id').unsigned().references('users.id')
        table.integer('post_id').unsigned().references('posts.id')
    })
    .createTable('comments',(table)=>{
        table.increments()
        table.integer('user_id').unsigned().references('users.id')
        table.integer('post_id').unsigned().references('posts.id')
        table.string('comment').notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
        .dropTable('likes')
        .dropTable('posts')
  
};
