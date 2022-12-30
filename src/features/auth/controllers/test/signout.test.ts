import { Request, Response } from 'express';
import { authMockRequest, authMockResponse } from '@root/mocks/auth.mock';
import { SignOut } from '@auth/controllers/signout';

const USERNAME = 'Lucas';
const PASSWORD = '12341234';

describe('SignOut', () => {
  it('should set session to null', async () => {
    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();
    await SignOut.prototype.update(req, res);
    expect(req.session).toBeNull();
  });

  it('should send correct json response', async () => {
    const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }) as Request;
    const res: Response = authMockResponse();
    await SignOut.prototype.update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logged out successfully',
      user: {},
      token: ''
    });
  });
});
