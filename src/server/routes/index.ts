import { Router , Request} from "express";
import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (req,res) => {
    return res.send('Ola DEV');
});


// cities
router.post('/city',CitiesController.createbodyValidator,CitiesController.create);



export {router};