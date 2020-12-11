import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';

const mockCredentialsDto = {
    username: 'user1',
    password: 'totot',
};

describe('UserRepository', () => {
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserRepository],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe('Sign up', () => {
        let save;

        beforeEach(() => {
            save = jest.fn();
            userRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('Successfully signs up the user', async () => {
            save.mockResolvedValue(undefined);
            await expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
        });

        it('Throws a conflic exception as username already exists', () => {
            save.mockResolvedValue({ code: '23505' });
            return expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException);
        });

        it('Throws a internal server error exception', () => {
            save.mockResolvedValue({ code: 'AnotherCode' });
            return expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
        });
    });
});
