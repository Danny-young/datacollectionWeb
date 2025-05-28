import { pgTable, serial, text, integer, timestamp, numeric } from 'drizzle-orm/pg-core'

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  valuation_no: text('valuation_no').notNull(),
  valuation_amt: numeric('valuation_amt').notNull(),
  property_no: text('property_no').notNull(),
  duration: integer('duration').notNull(),
  property_type: text('property_type').notNull(),
  units: integer('units').notNull(),
  tax_rate: numeric('tax_rate').notNull(),
  data_typeInfo: text('data_type_info').notNull(),
  isbilled: integer('is_billed').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const bills = pgTable('bills', {
  id: serial('id').primaryKey(),
  billId: text('bill_id').notNull().unique(),
  valuation_no: text('valuation_no').notNull(),
  valuation_amt: numeric('valuation_amt').notNull(),
  property_no: text('property_no').notNull(),
  duration: integer('duration').notNull(),
  property_type: text('property_type').notNull(),
  units: integer('units').notNull(),
  data_typeInfo: text('data_type_info').notNull(),
  bill_amount: numeric('bill_amount').notNull(),
  billing_year: integer('billing_year').notNull(),
  status: text('status').default('unpaid'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
}) 