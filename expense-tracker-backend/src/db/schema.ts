import {
	integer,
	pgTable,
	varchar,
	timestamp,
	numeric,
	pgEnum,
} from 'drizzle-orm/pg-core';

export const categoriesEnum = pgEnum('categories', [
	'Food',
	'Bills',
	'Transport',
	'Entertainment',
	'Utilities',
	'Other',
]);

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	walletAddress: varchar({ length: 255 }).notNull().unique(),
	nonce: varchar({ length: 255 }).notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const expenses = pgTable('expenses', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer()
		.notNull()
		.references(() => users.id),
	amount: numeric({ precision: 10, scale: 2 }).notNull(),
	category: categoriesEnum().notNull(),
	note: varchar({ length: 255 }),
	date: timestamp().notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
