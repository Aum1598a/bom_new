import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, priorities,unit } from "./data"

const tasks = Array.from({ length: 100 }, () => ({
  id_item: `TASK-${faker.datatype.number({ min: 1000, max: 9999 })}`,
  um: faker.helpers.arrayElement(unit).value,
  description: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  prod_line: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  bom_release: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status_item: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  unit_cost: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  pack_std: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  cubic_foot: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  supply_name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  docx_test: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),

}))

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")