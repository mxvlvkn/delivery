import database from '../database/database.js';

export default class DBService {
    constructor() {
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.getUserByNick = this.getUserByNick.bind(this);
    }
    static async getUserByLogin(login) {
        try {
            return {
                data: (await database.query('SELECT * FROM user_admin WHERE login = $1', [login])).rows,
                status: true
            };
        } catch(err) {
            console.log('DB: get user_admin by login error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getUserIdByLogin(login) {
        try {
            return {
                data: (await database.query('SELECT id FROM user_admin WHERE login = $1', [login])).rows[0].id,
                status: true
            };
        } catch(err) {
            console.log('DB: get user_admin id by login error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async saveToken(id, token) {
        try {
            (await database.query('INSERT INTO user_token (user_id, token) values ($1, $2)', [
                id, 
                token,  
            ]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: save token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getIsTokenExist(token) {
        try {
            const ResData = (await database.query('SELECT id FROM user_token WHERE token = $1', [token])).rows

            return {
                data: [],
                status: ResData.length > 0
            };
        } catch(err) {
            console.log('BD: get is token exist: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async deleteToken(token) {
        try {
            (await database.query('DELETE FROM user_token WHERE token = $1', [token]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: save token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    //;//;//;///;//;//;///;//;//;//;/;//;/;/;/;/;;/;/;/;//;/;;;;;;///;/;/;/;/;/;/;/;/;;//;/;/;/;

    static async getCode() {
        try {
            return {
                data: (await database.query('SELECT * FROM code')).rows[0].code,
                status: true
            };
        } catch(err) {
            console.log('BD: get code error: ' + err);
        }
    }
    static async createUser(email, nickname, pass, roole) {
        try {
            (await database.query('INSERT INTO person (email, nickname, pass, roole) values ($1, $2, $3, $4)', [
                email, 
                nickname,  
                pass, 
                roole
            ]));

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('BD: create user error error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async getUserByEmail(email) {
        try {
            return {
                data: (await database.query('SELECT * FROM person WHERE email = $1', [email])).rows,
                status: true
            };
        } catch(err) {
            console.log('BD: get user by email error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async getUserByNick(nick) {
        try {
            return {
                data: (await database.query('SELECT * FROM person WHERE nickname = $1', [nick])).rows,
                status: true
            };
        } catch(err) {
            console.log('BD: get user by nick error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async checkUserExistence(email, nick) {
        try {
            if ((await this.getUserByEmail(email)).data.length) {
                return {
                    status: false,
                    message: 'Пользователь с такой почтой уже существует'
                }
            }

            if ((await this.getUserByNick(nick)).data.length) {
                return {
                    status: false,
                    message: 'Пользователь с таким никнеймом уже существует'
                }
            }

            return {
                status: true,
                message: ''
            }
        } catch(err) {
            console.log('BD: get user existence error: ' + err);
        }
    }
    static async getUserIdByToken(token) {
        try {
            return {
                data: (await database.query('SELECT * FROM person_token WHERE token = $1', [token])).rows[0],
                status: true
            };
        } catch(err) {
            console.log('BD: get user by token: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async createPost(title, desc) {
        try {
            let data = (await database.query('INSERT INTO post (title, decs, file) values ($1, $2, $3)', [
                title, 
                desc,  
                'none'
            ]));

            return {
                data,
                status: true
            };
        } catch(err) {
            console.log('BD: create user error error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
}