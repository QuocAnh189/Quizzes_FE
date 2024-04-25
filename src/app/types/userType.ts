type UserType = {
    _id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
    userType: string;
    point: number;
    follows: UserType[];
    friends: UserType[];
    isVerified: boolean;
    emailToken: '';
    workPlace: any;
    bio: string;
};

export const InitUser = {
    _id: '',
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    avatar: '',
    userType: '',
    point: 0,
    follows: [],
    friends: [],
    workPlace: '',
    bio: '',
    emailToken: '',
    isVerified: true
} as UserType;

export default UserType;
