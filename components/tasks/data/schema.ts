import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  // id_item: z.string(),
  // um: z.string(),
  // description: z.string(),
  // prod_line: z.number(),
  // bom_release: z.string(),
  // status_item: z.string(),
  // unit_cost: z.number(),
  // pack_std: z.number(),
  // cubic_foot: z.number(),
  // supply_name: z.string(),
  item_number: z.string(),
  status_test: z.string().nullable(),
  prod_area: z.string().nullable(),
  prod_unit: z.string().nullable(),
  docx_test: z.string().nullable(),
})

export type Task = z.infer<typeof taskSchema>