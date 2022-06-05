import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2" 

import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";



// 
@Injectable()
export class AuthService{

    //
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    //
    async signup(dto: AuthDto){
        
        // hash password
        var hash = await argon.hash(dto.password)

        // 
        try {
                
            // save user in db
            var user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash 
                }
            })
                
            //
            delete user.hash;
            
            // return user from db 
            return user;


        } catch (error) {

            //
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Email Alreaddy Exists!");
                } 
            }

            //
            throw error;
            
        }


    }


    //
    async login(dto: AuthDto){

        // find user
        const user = await this.prisma.user.findUnique({
            where: {email: dto.email}
        })

        // if not exists throw err
        if (!user) throw new ForbiddenException("Email not exists!")
        

        // compare passwords
        var passMatch = await argon.verify(user.hash , dto.password)
        // if pass not equal throw
        if (!passMatch) throw new ForbiddenException("Password incorrect!")


        // token
        return this.signToken(user.id, user.email)

    }


    // generate token
    async signToken(
        userID: number,
        email: string, 
    ): Promise<{access_token: string}>{

        //
        const payload = {
            sub: userID,
            email
        }

        //
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        })

        //
        return {
            access_token: token
        }

    }
    
}