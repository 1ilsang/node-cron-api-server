import { Router } from 'express';
import {jobList, indexWelcome, job} from '../controller/index.controller';

const router = Router();

router.route('/')
    .get(indexWelcome);

router.get('/list', jobList.get);
router.get('/list/:seq', jobList.get);
router.get('/job/:seq', job.get);

router.post('/job', job.post);

router.put('/job/:seq', job.put);

router.delete('/job/:seq', job.delete);

export default router;
