import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import Joi from 'joi';

const userSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
});

export const createUser = async (req: Request, res: Response) => {
    try {
        // Validate request body against schema
        const { value, error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(value); // Use validated data
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

export const getUsersByLastName = async (req: Request, res: Response) => {
    try {
        const { lastName } = req.query;
        console.log(req.query);
        if (typeof lastName !== 'string') {
            // Ensure that lastName is a string to prevent errors
            return res.status(400).json({ message: 'Last name must be a string.' });
        }

        const userRepository = AppDataSource.getRepository(User);
        console.log('Querying for lastName:', lastName);
        const users = await userRepository.find({
            where: {
                lastName: lastName
            },
            cache: false
        });
        console.log('Found users:', users);

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with the given last name.' });
        }
        res.status(200).json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};
