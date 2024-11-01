import { Router } from 'express';
import { analyzeText, getTextAnalysis } from '../controllers/TextController';

const router = Router();

router.post('/text', analyzeText);
router.get('/text/:id', getTextAnalysis);
router.get("/test", (req, res)=> {
    res.send({message: "test route successfull"});
});

export default router;
