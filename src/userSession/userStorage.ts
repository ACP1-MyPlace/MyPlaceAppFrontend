interface UserDataSession {
    token: string
}

class UserStorage {
    keyAdminStorage: string = "adminSessionMyPlace";

    public logInUser(token: string) : void {

        let userSession: UserDataSession =
            {
                token: token
            }

        localStorage.setItem(this.keyAdminStorage, JSON.stringify(userSession));
    }

    public get(): UserDataSession {
        return JSON.parse(
            localStorage.getItem(this.keyAdminStorage) as string
        ) as UserDataSession
    }

    public logOutUser() {
        localStorage.removeItem(this.keyAdminStorage);
    }

    public isLogged() : boolean { return !!localStorage.getItem(this.keyAdminStorage); }

    public getToken() : string | null {
        let user : UserDataSession = this.get();
        
        return user.token;
    }
}

export const userStorage = new UserStorage();