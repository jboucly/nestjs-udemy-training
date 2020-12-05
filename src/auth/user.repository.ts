import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async signUp(dto: AuthCredentialsDto): Promise<void> {
        const { username, password } = dto;

        const salt = await genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this._hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            // Duplicate username
            if (error.code === '23505') {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    public async validateUserPassword(dto: AuthCredentialsDto): Promise<string> {
        const { username, password } = dto;

        const user = await this.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            return null;
        }
    }

    private async _hashPassword(password: string, salt: string): Promise<string> {
        return await hash(password, salt);
    }
}
