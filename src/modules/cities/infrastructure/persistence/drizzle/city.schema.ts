import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const citiesTable = pgTable(
  'cities',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex('cities_name_unique').on(table.name)],
);
