import * as bycript from 'bcrypt';
import { User } from './user.entity';

describe('User entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.password = 'TestPassword';
        user.salt = 'SaltTest';
        (bycript.hash as any) = jest.fn();
    });

    describe('ValidatePassword', () => {
        it('Returns true as password is valid', async () => {
            (bycript.hash as any).mockReturnValue('TestPassword');

            expect(bycript.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('12345');

            expect(bycript.hash).toHaveBeenCalledWith('12345', 'SaltTest');
            expect(result).toEqual(true);
        });

        it('Returns false as password is invalid', async () => {
            (bycript.hash as any).mockReturnValue('WrongPassword');

            expect(bycript.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('WrongPassword');

            expect(bycript.hash).toHaveBeenCalledWith('WrongPassword', 'SaltTest');
            expect(result).toEqual(false);
        });
    });
});
