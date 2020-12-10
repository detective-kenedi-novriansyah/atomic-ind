export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    create_at: any;
    update_at: any;
    confirm_password: string;
}

export interface Purse {
    id: number;
    reference: string;
    description: string;
    status: boolean | number;
    create_at: any;
    update_at: any;
    user_id: User;
}

export interface UserState {
    readonly user: User;
    readonly allUser: User[];
    readonly token: string;
}

export interface CustomLinks {
    links: string
}

export interface PurseState {
    readonly purse: Purse;
    readonly allPurse: Purse[];
    readonly active: Purse[];
    readonly nextPageUrl: string;
    readonly prevPageUrl: string;
    readonly total: number;
    readonly count: number;
    readonly links: CustomLinks[]
}

export interface UserMutations {
    [x: string] : (user: UserState, data: any) => void;
}

export interface UserGetters {
    [x: string] : (user: UserState, data: any) => void;
}

export interface PurseMutations {
    [xy: string] : (purse: PurseState, data: any) => void;
}

export interface PurseGetters {
    [xy: string] : (purse: PurseState, data: any) => void;
}

export interface FailuredMessage {
    response: {
        data: {
            message: {
                email: any[];
                username: any[];
                password: any[];
                confirm_password: any[]
            }
        }
    }
}

class Failure {
    constructors(type: FailuredMessage) {
        if(type.response.data.message.username) {
            return type.response.data.message.username[0]
        } else if(type.response.data.message.email) {
            return type.response.data.message.email[0]
        } else if(type.response.data.message.password) {
            return type.response.data.message.password[0]
        } else if(type.response.data.message.confirm_password) {
            return type.response.data.message.confirm_password[0]
        }
    }
}

export const Message = new Failure()

interface Links {
    active: boolean;
    label: string | number;
    url: string;
}

export interface PurseData {
    current_page: number;
    data: [Purse];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        [x:number] : string
    };
    nextPageUrl: string;
    path: string;
    per_page: number;
    prevPageUrl: string;
    to: number;
    total: number;
    count: number;
}

export interface PurseActiveState {
    id: number;
    status: boolean;
}

export interface FailuredRecordMessage {
    response: {
        data: {
            message: {
                reference: any[];
                description: any[];
            }
        }
    }
}

class RecordFailure {
    constructors(type: FailuredRecordMessage) {
        if(type.response.data.message.reference) {
            return type.response.data.message.reference[0]
        } else if(type.response.data.message.description) {
            return type.response.data.message.description[0]
        }
    }
}

export const RecordPurseMessage = new RecordFailure()