import fs from 'fs';
import dotenv from 'dotenv';

import { paths } from './paths';

const hasEnvLocal = fs.existsSync(paths.env.local);

dotenv.config({ path: hasEnvLocal ? paths.env.local : paths.env.main });
