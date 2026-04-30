import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { citiesTable } from 'src/modules/cities/infrastructure/persistence/drizzle/city.schema';

export const hotelsTable = pgTable('hotels', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  cityId: integer('city_id')
    .notNull()
    .references(() => citiesTable.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
