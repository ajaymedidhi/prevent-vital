class MedicalDataError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MedicalDataError';
        this.statusCode = 400; // Bad Request
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

module.exports = {
    MedicalDataError,
    ValidationError
};
