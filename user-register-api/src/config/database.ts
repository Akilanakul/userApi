import { DataSource } from 'typeorm';
import { User } from '../entity/User';

// Define the data source for the application
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [User],
    synchronize: true,
    logging: false
});

// Function to initialize the database
export const databaseInitializer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization", error);
        throw error;
    }
};
