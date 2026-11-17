
import * as userModel from '../models/userModel.js';
import ValidationError from '../utils/ValidationError.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

//START CHECK EXISTING USERS
const doesUserExist = async (email) => {
    const existing = await userModel.findUserByEmail(email);

    if (existing.length > 0) {
        return {
            result: true,
            user: existing[0]
        };
    }

    return {
        result: false,
        user: null
    };
}
//


//START CREATE ACCOUNT
export const createAccount = async (user) => {

    //Required fields
    if (!user.name || !user.email || !user.password) {
        throw new ValidationError(
            'Name, email and password is required!', 400
        );
    }

    //Email validation
    if (!validator.isEmail(user.email)) {
        throw new ValidationError(
            'Improper email format.', 400
        );
    }

    //Password validation
    if (!validator.isStrongPassword(user.password)) {
        throw new ValidationError(
            'Password is not strong enough.', 400
        );
    }

    //Check existing email
    const existing = await doesUserExist(user.email);

    if (existing.result) {
        throw new ValidationError(
            'An account with that email already exist', 400
        );
    }

    //Password hashing
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    //Insert user
    const result = await userModel.insert({
        name: user.name,
        email: user.email,
        password: hashedPassword
    });

    if (!result || result <= 0) {
        throw new Error(
            'Unable to create an account. Please try again later.'
        );
    }

    return 'Account created successfully!';
}
//


//START LOGIN
export const login = async (user) => {

    if (!user.email || !user.password) {
        throw new ValidationError(
            'Email and password is required!', 400
        );
    }

    const existing = await doesUserExist(user.email);

    if (!existing.result) {
        throw new ValidationError(
            'An account with that email does not exist', 400
        );
    }

    //Compare password
    const isCorrectPassword = await bcrypt.compare(
        user.password,
        existing.user.password
    );

    if (!isCorrectPassword) {
        throw new ValidationError(
            'Incorrect password!', 400
        );
    }

    return 'Login successfully!';
}
// 
