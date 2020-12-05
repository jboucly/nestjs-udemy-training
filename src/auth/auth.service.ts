import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository) {}

    public signUp(dto: AuthCredentialsDto): Promise<void> {
        return this._userRepository.signUp(dto);
    }

    public async signIn(dto: AuthCredentialsDto): Promise<void> {
        const username = await this._userRepository.validateUserPassword(dto);

        if (!username) {
            throw new UnauthorizedException('Invalide credentials');
        }
    }
}
