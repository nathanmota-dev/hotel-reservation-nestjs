import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { roomsTable } from 'src/modules/rooms/infrastructure/persistence/drizzle/room.schema';
import { usersTable } from 'src/modules/users/infrastructure/persistence/drizzle/user.schema';

export const bookingsTable = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  roomId: integer('room_id')
    .notNull()
    .references(() => roomsTable.id),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
