import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'change_this_secret_key_on_production',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      privateKey: payload.privateKey,
    };
  }
}
