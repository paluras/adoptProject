import { Request, Response, NextFunction } from 'express';
import { AnimalController } from '../../controllers/animalController';
import { AnimalModel } from '../../models/animalModel';
import { AppError, ErrorHandler, ErrorType } from '../../utils/ErrorHandler';
import { createAnimalValidation, validateAnimal } from '../../middleware/validateMiddleware';
import { Animal, AnimalInput } from '../../schemas/animalSchema';
import { mock } from 'node:test';
// import { MedicalHistoryModel } from '../../models/medicalHistoryModel';
// import { ErrorHandler, ErrorType } from '../../utils/ErrorHandler';
// import { AppError } from '../../utils/ErrorHandler';
// import { Animal, AnimalInput } from '../../schemas/animalSchema';
// import express from 'express';
// import request from 'supertest';

jest.mock('../../models/animalModel');
const MockedAnimalModel = AnimalModel as jest.MockedClass<typeof AnimalModel>;



type MockResponse = Partial<Response> & {
    json: jest.Mock;
    status: jest.Mock;
};

describe('AnimalController', () => {
    let animalController: AnimalController;
    let mockRequest: Partial<Request>;
    let mockResponse: MockResponse;
    let mockNext: jest.Mock;
    let mockAnimalModel: jest.Mocked<AnimalModel>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockAnimalModel = {
            addAnimal: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            updateAnimal: jest.fn(),
            deleteAnimal: jest.fn(),
            validateAnimalInput: jest.fn(),
        } as jest.Mocked<AnimalModel>;

        MockedAnimalModel.mockImplementation(() => mockAnimalModel);


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

            const mockAnimal: Animal = { id: 1, ...mockRequest.body, image_url: ['image.jpg'] };

            mockAnimalModel.addAnimal.mockResolvedValue(mockAnimal);

            await animalController.addAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                body: mockAnimal,
                message: 'Successfully added an animal',
            });
        });
        it('should call next with validation error if input is invalid', async () => {
            mockRequest.body = {
                name: 'asdd',
                species: 'Dog',
                age: -3,
                breed: 'Golden Retriever',
                status: 'Available',
                sex: 'Male',
                description: 'A friendly dog',
            };
            mockRequest.files = [{ filename: 'image.jpg' }] as unknown as Express.Multer.File[];

            await Promise.all(createAnimalValidation
                .map(validation => validation(mockRequest as Request, mockResponse as Response, mockNext)));
            validateAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('Age must be a number between 0 and 100'),
                type: ErrorType.VALIDATION,
                statusCode: 400,
            }));
        });

        it('should not add an invalid animal', async () => {
            mockRequest.body = {
                name: '',
                species: 'Cat',
                age: -3,
                breed: 'Persian',
                status: 'Valabil',
                sex: 'Femela',
                description: 'A cute cat',
            };
            mockRequest.files = [{ filename: 'image.jpg' }] as unknown as Express.Multer.File[];

            mockAnimalModel.addAnimal.mockRejectedValue(ErrorHandler.createError('Invalid animal', ErrorType.VALIDATION));
            await animalController.addAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Invalid animal',
                type: ErrorType.VALIDATION,
                statusCode: 400
            }));
        });
    });

    describe('getAllAnimals', () => {
        it('should get all animals', async () => {
            const mockAnimals: Animal[] = [
                { id: 1, name: 'Fluffy', species: 'Caine', age: 3, breed: 'Bulldog', status: 'Valabil', sex: 'Mascul', description: 'Friendly dog', image_url: ['image1.jpg'], user_id: 1 },
                { id: 2, name: 'Buddy', species: 'Caine', age: 2, breed: 'Beagle', status: 'Valabil', sex: 'Mascul', description: 'Playful dog', image_url: ['image2.jpg'], user_id: 1 },
            ];
            mockAnimalModel.getAll.mockResolvedValue(mockAnimals);
            await animalController.getAllAnimals(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );
            expect(mockResponse.json).toBeDefined();
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Successfully found the animals',
                body: mockAnimals,
            });
        });
    });

    describe('getAnimalById', () => {
        it('should get an animal by id', async () => {
            const mockAnimal: Animal = { id: 1, name: 'Fluffy', species: 'Caine', age: 3, breed: 'Bulldog', status: 'Valabil', sex: 'Mascul', description: 'Friendly dog', image_url: ['image1.jpg'], user_id: 1 }
            mockRequest.params = { id: '1' };
            mockAnimalModel.getById.mockResolvedValue(mockAnimal);
            await animalController.getAnimalById(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Successfully Found the Animal with Id1',
                body: mockAnimal,
            });


        });
        it('should call next with not found error if animal does not exist', async () => {
            mockRequest.params = { id: '1' };
            mockAnimalModel.getById.mockRejectedValue(ErrorHandler.createError('Animal not found', ErrorType.NOT_FOUND));
            await animalController.getAnimalById(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
        });

    });

    describe('updateAnimal', () => {
        it('should update an animal successfully', async () => {
            const mockAnimal: Animal = { id: 1, name: 'Fluffy', species: 'Caine', age: 3, breed: 'Bulldog', status: 'Valabil', sex: 'Mascul', description: 'Friendly dog', image_url: ['image1.jpg'], user_id: 1 };
            const updatedAnimal: Animal = { id: 1, name: 'Fluffy', species: 'Caine', age: 4, breed: 'Bulldog', status: 'Valabil', sex: 'Mascul', description: 'Friendly dog', image_url: ['image1.jpg'], user_id: 1 };
            mockRequest.params = { id: '1' };
            mockRequest.body = { age: 4 };

            mockAnimalModel.getById.mockResolvedValue(mockAnimal);
            mockAnimalModel.updateAnimal.mockResolvedValue(updatedAnimal);

            await animalController.updateAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedAnimal);
        });

        it('should call next with not found error if animal does not exist', async () => {
            mockRequest.params = { id: '1' };
            mockAnimalModel.getById.mockRejectedValue(ErrorHandler.createError('Animal not found', ErrorType.NOT_FOUND));
            await animalController.updateAnimal(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
        });
    });

    describe('deleteAnimalById', () => {
        it('should delete an animal successfully', async () => {
            mockRequest.params = { id: '1' };

            mockAnimalModel.deleteAnimal.mockResolvedValue('Successfully deleted');
            await animalController.deleteAnimalById(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Successfully deleted',
                id: 1,
            });
        });

        it('should call next with not found error if animal does not exist', async () => {
            mockRequest.params = { id: '1' };

            mockAnimalModel.deleteAnimal.mockRejectedValue(ErrorHandler.createError('Animal not found', ErrorType.NOT_FOUND));
            await animalController.deleteAnimalById(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
        });
    });

});
