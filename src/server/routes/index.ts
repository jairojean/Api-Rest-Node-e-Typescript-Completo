import { Router } from 'express';
import {CitiesController, PeoplesController, UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});
router.post('/cities', ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/peoples', ensureAuthenticated, PeoplesController.getAllValidation, PeoplesController.getAll);
router.post('/peoples', ensureAuthenticated, PeoplesController.createValidation, PeoplesController.create);
router.get('/peoples/:id', ensureAuthenticated, PeoplesController.getByIdValidation, PeoplesController.getById);
router.put('/peoples/:id', ensureAuthenticated, PeoplesController.updateByIdValidation, PeoplesController.updateById);
router.delete('/peoples/:id', ensureAuthenticated, PeoplesController.deleteByIdValidation, PeoplesController.deleteById);

router.post('/entrar', UsersController.signInValidation, UsersController.signIn);
router.post('/cadastrar', UsersController.signUpValidation, UsersController.signUp);

export { router };
