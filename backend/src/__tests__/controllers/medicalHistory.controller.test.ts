/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import { MedicalHistoryController } from '../../controllers/medicalHistoryController';
import { MedicalHistoryModel } from '../../models/medicalHistoryModel';
import { Request, Response } from 'express';
import { AppError, ErrorHandler, ErrorType } from '../../utils/ErrorHandler';
import { MedicalHistoryInput } from '../../schemas/medicalHistorySchema';

jest.mock('../../models/medicalHistoryModel');

const MockedMedicalHistoryModel = MedicalHistoryModel as jest.MockedClass<typeof MedicalHistoryModel>;

type MockResponse = Partial<Response> & {
    json: jest.Mock;
    status: jest.Mock;
};

describe('MedicalHistoryController', () => {
    let medicalHistoryController: MedicalHistoryController;
    let mockRequest: Partial<Request>;
    let mockResponse: MockResponse;
    let mockNext: jest.Mock;
    let mockMedicalHistoryModel: jest.Mocked<MedicalHistoryModel>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMedicalHistoryModel = {
            addMedicalHistory: jest.fn(),
            updateMedicalHistory: jest.fn(),
            getMedicalHistoryByAnimalId: jest.fn(),
        } as jest.Mocked<MedicalHistoryModel>;

        MockedMedicalHistoryModel.mockImplementation(() => mockMedicalHistoryModel);

        medicalHistoryController = new MedicalHistoryController();
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

    describe('addMedicalHistory', () => {
        it('should add a medical history successfully', async () => {
            const mockMedicalHistory: MedicalHistoryInput = {
                animal_id: 1,
                vaccines: 'Rabies',
                dewormings: 'Yes',
                treatments: 'Antibiotics',
                notes: 'Regular check-ups'
            };
            const savedMedicalHistory = {
                ...mockMedicalHistory,
                id: 1,
                created_at: new Date()
            };
            mockRequest.body = mockMedicalHistory;

            mockMedicalHistoryModel.addMedicalHistory.mockResolvedValue(savedMedicalHistory as unknown as MedicalHistoryModel);

            await medicalHistoryController.addMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Successfuly added a medical history",
                body: savedMedicalHistory,
            });
        });

        it('should call next with error if adding medical history fails', async () => {
            const mockMedicalHistory: MedicalHistoryInput = {
                animal_id: 1,
                vaccines: 'Rabies',
                dewormings: 'Yes',
                treatments: 'Antibiotics',
                notes: 'Regular check-up'
            };
            mockRequest.body = mockMedicalHistory;
            const error = ErrorHandler.createError('Failed to add medical history', ErrorType.DATABASE);
            mockMedicalHistoryModel.addMedicalHistory.mockRejectedValue(error);

            await medicalHistoryController.addMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Failed to add medical history',
                type: ErrorType.DATABASE,
                statusCode: 500
            }));
        });
    });

    describe('updateMedicalHistory', () => {
        it('should update a medical history successfully', async () => {
            const mockMedicalHistoryInput: MedicalHistoryInput = {
                animal_id: 1,
                vaccines: 'Rabies',
                dewormings: 'Yes',
                treatments: 'Antibiotics',
                notes: 'Updated notes'
            };
            const updatedMedicalHistory = {
                ...mockMedicalHistoryInput,
                id: 1,
                created_at: new Date()
            };
            mockRequest.body = mockMedicalHistoryInput;
            mockMedicalHistoryModel.updateMedicalHistory.mockResolvedValue(updatedMedicalHistory as unknown as MedicalHistoryModel);

            await medicalHistoryController.updateMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Successfuly updated a medical history",
                body: updatedMedicalHistory,
            });
        });

        it('should call next with error if updating medical history fails', async () => {
            const mockMedicalHistoryInput: MedicalHistoryInput = {
                animal_id: 1,
                vaccines: 'Rabies',
                dewormings: 'Yes',
                treatments: 'Antibiotics',
                notes: 'Updated notes'
            };
            mockRequest.body = mockMedicalHistoryInput;
            const error = ErrorHandler.createError('Failed to update medical history', ErrorType.DATABASE);
            mockMedicalHistoryModel.updateMedicalHistory.mockRejectedValue(error);

            await medicalHistoryController.updateMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Failed to update medical history',
                type: ErrorType.DATABASE,
                statusCode: 500
            }));
        });
    });

    describe('getMedicalHistory', () => {
        it('should get medical history by animal id', async () => {
            const mockMedicalHistory = {
                id: 1,
                animal_id: 1,
                vaccines: 'Rabies',
                dewormings: 'Yes',
                treatments: 'Antibiotics',
                notes: 'Regular check-up',
                created_at: new Date()
            };
            mockRequest.params = { animalId: '1' };
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockResolvedValue(mockMedicalHistory as unknown as MedicalHistoryModel);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Succesfuly fetched the medical data",
                body: mockMedicalHistory,
            });
        });

        it('should return 404 if no medical history found', async () => {
            mockRequest.params = { animalId: '1' };
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockResolvedValue(null as unknown as MedicalHistoryModel);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'No medical history found for this animal',
            });
        });

        it('should call next with error if getting medical history fails', async () => {
            mockRequest.params = { animalId: '1' };
            const error = ErrorHandler.createError('Failed to get medical history', ErrorType.DATABASE);
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockRejectedValue(error);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Failed to get medical history',
                type: ErrorType.DATABASE,
                statusCode: 500
            }));
        });
    });
});