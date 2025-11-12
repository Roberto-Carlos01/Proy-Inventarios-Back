import { IsEmail, IsNotEmpty, Matches, matches, MaxLength, MinLength} from "class-validator";

export class LoginAuthDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @MinLength(6)
    @MaxLength(30)
    @IsNotEmpty()
    //@Matches(/ /)
    password:string;
}