import { Request, Response, NextFunction } from 'express';
import { AnimalController } from '../../controllers/animalController';
import { AnimalModel } from '../../models/animalModel';
// import { MedicalHistoryModel } from '../../models/medicalHistoryModel';
// import { ErrorHandler, ErrorType } from '../../utils/ErrorHandler';
// import { AppError } from '../../utils/ErrorHandler';
// import { Animal, AnimalInput } from '../../schemas/animalSchema';
// import express from 'express';
// import request from 'supertest';

jest.mock('../../models/animalModel');



type MockResponse = Partial<Response> & {
    json: jest.Mock;
    status: jest.Mock;
};

describe('AnimalController', () => {
    let animalController: AnimalController;
    let mockRequest: Partial<Request>;
    let mockResponse: MockResponse;
    let mockNext: jest.Mock;

    beforeEach(() => {
        animalController = new AnimalController();
        mockRequest = {
            query: {},
            params: {},
            user: { id: 1 }
        } as Partial<Request> & {
            user: { id: number },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe('addAnimal', () => {
        it('should add an animal successfully', async () => {
            mockRequest.body = {
                name: 'Fluffy',
                species: 'Cat',
                age: 3,
                breed: 'Persian',
                status: 'Valabil',
                sex: 'Femela',
                description: 'A cute cat',
            };
            mockRequest.files = [{ filename: 'image.jpg' }] as unknown as Express.Multer.File[];


            const mockAnimal = { id: 1, ...mockRequest.body, image_url: ['image.jpg'] };
            (AnimalModel.prototype.addAnimal as jest.Mock).mockResolvedValue(mockAnimal);

            await animalController.addAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                body: mockAnimal,
                message: 'Successfully added an animal',
            });
        });
    });
    describe('getAllAnimals', () => {
        it('should get all animals', async () => {
            const mockAnimals = [
                { id: 1, name: 'Fluffy', species: 'Caine' },
                { id: 2, name: 'Buddy', species: 'Caine' },
            ];
            (AnimalModel.prototype.getAll as jest.Mock).mockResolvedValue(mockAnimals);

            await animalController.getAllAnimals(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            console.log('mockResponse.json called:', mockResponse.json.mock.calls);
            console.log('mockNext called:', mockNext.mock.calls);

            expect(mockResponse.json).toBeDefined();
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Successfully found the animals',
                body: mockAnimals,
            });
        });
    });

    describe('getAnimalById', () => {
        it('should get an animal by id', async () => {
            const mockAnimal = { id: 1, name: 'Fluffy', species: 'Cat' };
            mockRequest.params = { id: '1' };
            (AnimalModel.prototype.getById as jest.Mock).mockResolvedValue(mockAnimal);

            await animalController.getAnimalById(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Successfully Found the Animal with Id1',
                body: mockAnimal,
            });
        });
    });
});
