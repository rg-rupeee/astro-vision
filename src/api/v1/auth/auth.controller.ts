import { NextFunction, Request, Response } from 'express';
import { Service, Inject } from 'typedi';
import { AuthService } from './auth.service';
import catchAsync from '@middleware/catchAsync';

@Service()
class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  public signup = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const { email, name, password, birthdate } = req.body;
      const result = await this.authService.signup({
        email,
        name,
        password,
        birthdate,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    },
  );

  public passwordLogin = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const { email, password } = req.body;
      const result = await this.authService.passwordLogin({
        email,
        password,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );
}

export default AuthController;
