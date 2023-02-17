import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import usersModel from '../models/User';

const User = usersModel;

export default {
  async register(request: Request, response: Response) {
    const { name, email, password, confirmPassword } = request.body;

    const userEmail = await User.findOne({ email });

    if (password !== confirmPassword) {
      return response.status(400).json({ error: 'As senhas devem ser iguais' });
    }

    if (userEmail) {
      return response
        .status(400)
        .json('Já existe uma conta com este e-mail no nosso sistema');
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });

      // 'Hasheando' a senha
      bcrypt.genSalt(10, (error: any, salt: any) => {
        bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
          if (err) {
            return response.json({
              error: 'Houve um erro durante o salvamento do usuário',
            });
          } else {
            newUser.password = hash;

            newUser.save();
          }
        });
      });

      if (newUser) return response.json(newUser);
    }
  },

  async login(request: Request, response: Response, next: NextFunction) {
    await passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true,
    })(request, response, next);
  },

  // logout(request: Request, response: Response, next: NextFunction) {
  //   request.logout((err: Error) => {
  //     if (err) return next(err);
  //   });

  //   return response.json('Logout realizado com sucesso!');
  // },
};
