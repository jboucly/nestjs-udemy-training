import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './models/jwt-payload';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    private _logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository,
        private _jwtService: JwtService,
    ) {}

    public signUp(dto: AuthCredentialsDto): Promise<void> {
        return this._userRepository.signUp(dto);
    }

    public async signIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this._userRepository.validateUserPassword(dto);

        if (!username) {
            throw new UnauthorizedException('Invalide credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this._jwtService.sign(payload);

        this._logger.debug(`Genereted JWT Token with payload ${JSON.stringify(payload)}`);

        return {
            accessToken,
        };
    }
}
