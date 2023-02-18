import * as bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import usersModel, { UserProps } from '../models/User';

const User = usersModel;

export interface PassportProps {
  use(strategy: LocalStrategy): void;
  serializeUser(
    fn: (user: UserProps, done: (err: any, id?: any) => void) => void,
  ): void;
  deserializeUser(
    fn: (id: any, done: (err: any, user?: any) => void) => void,
  ): void;
}

module.exports = (passport: PassportProps) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email: string, password: string, done: any) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'Usuário não encontrado' });
          }

          const isSamePasswords = await bcrypt.compare(password, user.password);

          if (isSamePasswords) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Senha inválida' });
          }
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user: UserProps, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, user: UserProps) => {
      done(err, user);
    });
  });
};
