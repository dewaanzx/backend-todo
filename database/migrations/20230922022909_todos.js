exports.up = function(knex) {
  return knex.schema.createTable("todos", (table) => {
  	table.increments("id").primary().unsigned();
  	table.integer("user_id");
  	table.integer("group_id").nullable();
  	table.string("task");
  	table.tinyint("checked", 1);
  	table.timestamp("created_at").defaultTo(knex.fn.now());
  	table.timestamp("updated_at").defaultTo(knex.fn.now());
  	table.timestamp("deleted_at").nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("todos");
};
