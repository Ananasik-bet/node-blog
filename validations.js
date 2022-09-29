import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Do not correct email').isEmail(),
    body('password', 'Password must be at least 8 symbols').isLength({ min: 8 }),
    body('firstName', 'Do not correct first name').isLength({ min: 3 }),
    body('secondName', 'Do not correct surname').isLength({ min: 3 }),
    body('avatarUrl', 'Do not correct avatar Url').optional().isURL()
];

export const loginValidation = [
    body('email', 'Do not correct email').isEmail(),
    body('password', 'Password must be at least 8 symbols').isLength({ min: 8 })
];

export const postCreateValidation = [
    body('title', 'Do not correct title').isLength({ min: 3 }).isString(),
    body('text', 'Do not correct text').isLength({ min: 10 }).isString(),
    body('tags', 'Do not correct tags').optional().isString(),
    body('imageUrl', 'Do not correct Image URL').optional().isURL()
];
