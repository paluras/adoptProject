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
                dewormings: 'yes',
                treatments: 'yes',
                notes: 'yes'
            };
            mockRequest.body = mockMedicalHistory;

            mockMedicalHistoryModel.addMedicalHistory.mockResolvedValue(mockMedicalHistory);

            await medicalHistoryController.addMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Successfuly added a medical history",
                body: mockMedicalHistory,
            });
        });

        it('should call next with error if adding medical history fails', async () => {
            mockRequest.body = { animal_id: 1, vaccines: ['Rabies'] };
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
            const mockMedicalHistory = { id: 1, animal_id: 1, vaccines: ['Rabies'], treatments: ['Antibiotics'] };
            mockRequest.body = { animal_id: 1, vaccines: ['Rabies'], treatments: ['Antibiotics'] };
            mockMedicalHistoryModel.updateMedicalHistory.mockResolvedValue(mockMedicalHistory);

            await medicalHistoryController.updateMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Successfuly updated a medical history",
                body: mockMedicalHistory,
            });
        });

        it('should call next with error if updating medical history fails', async () => {
            const error = new Error('Failed to update medical history');
            mockRequest.body = { animal_id: 1, vaccines: ['Rabies'], treatments: ['Antibiotics'] };
            mockMedicalHistoryModel.updateMedicalHistory.mockRejectedValue(error);

            await medicalHistoryController.updateMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getMedicalHistory', () => {
        it('should get medical history by animal id', async () => {
            const mockMedicalHistory = { id: 1, animal_id: 1, vaccines: ['Rabies'] };
            mockRequest.params = { animalId: '1' };
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockResolvedValue(mockMedicalHistory);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Succesfuly fetched the medical data",
                body: mockMedicalHistory,
            });
        });

        it('should return 404 if no medical history found', async () => {
            mockRequest.params = { animalId: '1' };
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockResolvedValue(null);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'No medical history found for this animal',
            });
        });

        it('should call next with error if getting medical history fails', async () => {
            const error = new Error('Failed to get medical history');
            mockRequest.params = { animalId: '1' };
            mockMedicalHistoryModel.getMedicalHistoryByAnimalId.mockRejectedValue(error);

            await medicalHistoryController.getMedicalHistory(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});