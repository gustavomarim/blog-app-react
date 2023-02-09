import * as bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import usersModel, { UserProps } from '../models/User';

const User = usersModel;

export interface PassportProps {
  use: (arg0: LocalStrategy) => void;
  serializeUser: (arg0: (user: UserProps, done: any) => void) => void;
  deserializeUser: (arg0: (id: string, done: any) => void) => void;
}

module.exports = (passport: PassportProps) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (email: string, password: string, done: any) => {
        User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, false);
          }

          // compara os valores 'hasheados'
          bcrypt.compare(
            password,
            user.password,
            (error: Error, isSamePasswords: boolean) => {
              if (isSamePasswords) {
                return done(null, user);
              }

              return done(error, false);
            },
          );

          return null;
        });
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
