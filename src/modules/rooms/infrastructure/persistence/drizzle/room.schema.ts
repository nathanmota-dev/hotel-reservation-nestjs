import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { hotelsTable } from 'src/modules/hotels/infrastructure/persistence/drizzle/hotel.schema';

export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  hotelId: integer('hotel_id')
    .notNull()
    .references(() => hotelsTable.id),
  name: text('name').notNull(),
  capacity: integer('capacity').notNull(),
  price: doublePrecision('price').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
