import {Router} from 'express';
import {test} from '../controller/time.controller';

const router = Router();

router.get('/', test);

export default router;
