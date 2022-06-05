import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { userInfo } from "os";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


//
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    //
    constructor(
        config: ConfigService, 
        private prisma: PrismaService
    ){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET")
        });

    }

    // required for @UseGuards not /auth/signin
    async validate(payload: {sub: number, email: string}){
        
        // 
        const user = await this.prisma.user.findUnique({
            where: {id: payload.sub}
        })
        delete user.hash;

        // accessible from user.controller.ts
        return user;

    }


}