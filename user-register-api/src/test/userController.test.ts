import { app } from '../server';
import request from 'supertest';

jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn((options) => {
        // Check if the query includes a last name that does not exist
        if (options.where.lastName === 'Nonexistent') {
          return Promise.resolve([]); // Return an empty array for non-existent last name
        }
        // Return a mock user for other last names
        return Promise.resolve([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }]);
      }),
      create: jest.fn().mockImplementation(data => data),
      save: jest.fn().mockImplementation(data => Promise.resolve({ id: 1, ...data }))
    })
  }
}));

describe('User API', () => {
  describe('POST /api/users', () => {
    it('should return 400 for invalid user data', async () => {
      // Test invalid data fields
      const invalidUserData = [
        { firstName: 'John', lastName: 'Doe', email: 'invalid-email' }, // Invalid email
        { firstName: 'Jo', lastName: 'Doe', email: 'john.doe@example.com' }, // Invalid firstName
        { firstName: 'John', lastName: 'D', email: 'john.doe@example.com' } // Invalid lastName
      ];

      for (const data of invalidUserData) {
        const response = await request(app).post('/api/users').send(data);
        expect(response.status).toBe(400);
      }
    });

    it('should create a new user when data is valid', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };
      const response = await request(app).post('/api/users').send(userData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email');
    });
  });


  describe('GET /api/users', () => {
    it('should return users with the specified last name', async () => {
      const response = await request(app).get('/api/users?lastName=Doe');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].lastName).toBe('Doe');
    });

    it('should return 404 when no users are found with the given last name', async () => {
      const response = await request(app).get('/api/users?lastName=Nonexistent');
      console.log(response.body);
      expect(response.status).toBe(404);
    });

    it('should return 400 if lastName is not provided', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(400);
    });
  });

});

