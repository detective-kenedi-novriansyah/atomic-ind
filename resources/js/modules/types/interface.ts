export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    create_at: any;
    update_at: any;
    confirm_password: string;
}

export const UserStateProps = {
    user: {
        id: 0,
        username: '',
        email: '',
        create_at: Date(),
        update_at: Date(),
        password: '',
        confirm_password: ''
    },
    allUser: [],
    token: '',
}

export interface Purse {
    id: number;
    name: string;
    reference: string;
    description: string;
    status: boolean | number;
    create_at: any;
    update_at: any;
    user_id: User;
}

export const PurseStateProps = {
    purse: {
        id: 0,
        name: '',
        reference: '',
        description: '',
        create_at: '',
        update_at: '',
        status: false,
        user_id: {
            id: 0,
            username: '',
            email: '',
            create_at: '',
            update_at: '',
            password: '',
            confirm_password: ''
        }
    },
    allPurse: [],
    nextPageUrl: '',
    prevPageUrl: '',
    total: 0,
    count: 0,
    links: [],
    active: [],
}

export interface Category {
    id: number;
    code: string;
    description: string;
    category: string;
    value: string;
    user_id: User;
    purse_id: Purse;
    create_at: any;
    update_at: any;
}

export const CategoryStateProps = {
    category: {
        id: 0,
        code: '',
        description: '',
        category: '',
        value: '',
        create_at: '',
        update_at: '',
        purse_id: {
            id: 0,
            name: '',
            reference: '',
            description: '',
            status: false,
            create_at: '',
            update_at: '',
            user_id: {
                id: 0,
                username: '',
                email: '',
                password: '',
                create_at: '',
                update_at: '',
                confirm_password: '',
            },
        },
        user_id: {
            id: 0,
            username: '',
            email: '',
            password: '',
            create_at: '',
            update_at: '',
            confirm_password: '',
        }
    },
    allCategory: [],
    nextPageUrl: '',
    prevPageUrl: '',
    total: 0,
    count: 0,
    links: [],
    active: [],
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

export interface CategoryState {
    readonly category: Category;
    readonly allCategory: Category[];
    readonly active: Purse[];
    readonly nextPageUrl: string;
    readonly prevPageUrl: string;
    readonly total: number;
    readonly count: number;
    readonly links: CustomLinks[]
}

export interface UserMutations {
    [x: string] : (us: UserState, data: any) => void;
}

export interface UserGetters {
    [x: string] : (us: UserState, data: any) => void;
}

export interface PurseMutations {
    [xy: string] : (jp: PurseState, data: any) => void;
}

export interface PurseGetters {
    [xy: string] : (jp: PurseState, data: any) => void;
}

export interface CategoryMutations {
    [o: string] : (xp: CategoryState, data: any) => void;
}

export interface CategoryGetters {
    [o: string] : (xp: CategoryState, data: any) => void;
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

export interface PlusData {
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
                name: any[]
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
        } else if(type.response.data.message.name) {
            return type.response.data.message.name[0]
        }
    }
}

export const RecordPurseMessage = new RecordFailure()

export interface CategoryFailure {
    response: {
        data: {
            message: {
                code: any[];
                description: any[];
                value: any[]
                category: any[]
            }
        }
    }
}

class CategoryRecordFailure {
    constructors(type: CategoryFailure) {
        if(type.response.data.message.code) {
            return type.response.data.message.code[0]
        } else if(type.response.data.message.description) {
            return type.response.data.message.description[0]
        } else if(type.response.data.message.value) {
            return type.response.data.message.value[0]
        } else if(type.response.data.message.category) {
            return type.response.data.message.category[0]
        }
    }
}

export const CategoryFailure = new CategoryRecordFailure()