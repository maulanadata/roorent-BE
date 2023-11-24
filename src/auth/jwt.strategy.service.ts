import { Users } from "#/users/entities/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { use } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>      
    ){
        super({
            secretOrKey: "TOPSECRET2023",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: any){
        try {
            const userOne = this.usersRepository.findOne({
                where: {id: payload.id}
            })

            if (!userOne){
                throw new HttpException ({
                    StatusCode: HttpStatus.UNAUTHORIZED,
                    message: "token is invalid",
                },
                HttpStatus.UNAUTHORIZED)
            }
            return userOne
        } catch (err) { 
            throw err
        }
    }
}
    