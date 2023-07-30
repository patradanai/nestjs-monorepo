import * as path from 'node:path'

import * as dotenv from 'dotenv'

dotenv.config({
  path: path.join(process.cwd(), '/test', '.env.test'),
})
