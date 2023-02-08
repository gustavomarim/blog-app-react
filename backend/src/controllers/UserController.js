const mongoose = require('mongoose');
const passport = require('passport');

require('../models/User');

const User = mongoose.model('users');

const bcrypt = require('bcryptjs');

module.exports = {
  async register(request, response) {
    const { name, email, password } = request.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return response.status(400).json({
        error: 'Já Existe uma conta com este e-mail no nosso sistema',
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });

      // 'Hasheando' a senha
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
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

  async login(request, response, next) {
    await passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true,
    })(request, response, next);
  },

  logout(request, response, next) {
    request.logout((err) => {
      if (err) return next(err);
    });

    return response.json('Logout realizado com sucesso!');
  },
};
