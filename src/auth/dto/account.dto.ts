export default class AccountDto {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly nickname: string;
    readonly profile: string;
    readonly type: string;
    readonly notificationOpen: boolean;
    readonly emailOpen: boolean;

    constructor(
        email: string,
        name: string,
        password: string,
        nickname: string,
        profile: string,
        type: string,
        notificationOpen: boolean,
        emailOpen: boolean,
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.type = type;
        this.notificationOpen = notificationOpen;
        this.emailOpen = emailOpen;
    }
}