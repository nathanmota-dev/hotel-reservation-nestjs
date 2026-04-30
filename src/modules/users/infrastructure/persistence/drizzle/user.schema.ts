import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

export const usersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    role: roleEnum('role').default('USER').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex('users_email_unique').on(table.email)],
);
