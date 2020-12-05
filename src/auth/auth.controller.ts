import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private _service: AuthService) {}

    @Post('/signup')
    public signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
        return this._service.signUp(dto);
    }

    @Post('/signin')
    public signin(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this._service.signIn(dto);
    }
}
