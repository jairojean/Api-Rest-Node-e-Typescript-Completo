import { Router , Request} from "express";
import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (req,res) => {
    return res.send('Ola DEV');
});


// cities
router.post('/city',CitiesController.createBodyValidator,CitiesController.create);
router.get('/city',CitiesController.GetAllValidator,CitiesController.GetAll);
router.get('/city/:id',CitiesController.GetByIdValidation,CitiesController.GetById);
router.put('/city/:id',CitiesController.UpdateByIdValidation,CitiesController.UpdateById);
router.delete('/city/:id',CitiesController.DeleteValidation,CitiesController.DeleteById);

export {router};
