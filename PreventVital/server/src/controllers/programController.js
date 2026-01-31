const Program = require('../models/Program');
const Enrollment = require('../models/Enrollment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class ProgramController {
    // Get all programs with filtering, sorting, pagination
    getAllPrograms = catchAsync(async (req, res, next) => {
        const { category, difficulty, search, sort, page = 1, limit = 10 } = req.query;

        // Build query
        const queryObj = { status: 'published' };

        if (category && category !== 'all') {
            queryObj.category = category;
        }

        if (difficulty && difficulty !== 'all') {
            queryObj.difficulty = difficulty;
        }

        if (search) {
            queryObj.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute query with pagination
        let query = Program.find(queryObj);

        // Sorting
        if (sort) {
            const sortBy = sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(parseInt(limit));

        const programs = await query;
        const total = await Program.countDocuments(queryObj);

        res.status(200).json({
            status: 'success',
            results: programs.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: {
                programs
            }
        });
    });

    // Get single program by ID
    getProgram = catchAsync(async (req, res, next) => {
        const program = await Program.findById(req.params.id).populate('creator', 'name photo bio qualification');

        if (!program) {
            return next(new AppError('No program found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                program
            }
        });
    });

    // --- Execution Endpoints ---

    // Get Program Progress
    getProgramProgress = catchAsync(async (req, res, next) => {
        const programId = req.params.id;
        const userId = req.user.id;

        // Find existing enrollment
        let enrollment = await Enrollment.findOne({ user: userId, program: programId });

        if (!enrollment) {
            // Auto-enroll for now if not found (or return 404 depending on business logic)
            // For this demo, let's return a "not started" state
            return res.status(200).json({
                success: true,
                data: {
                    status: 'not_enrolled',
                    programId,
                    progressPercentage: 0
                }
            });
        }

        const program = await Program.findById(programId);

        res.status(200).json({
            success: true,
            data: {
                enrollmentId: enrollment._id,
                programId: enrollment.program,
                currentSession: enrollment.currentSessionIndex,
                totalSessions: program.totalSessions,
                completedSessions: enrollment.completedSessionsCount,
                progressPercentage: Math.round((enrollment.completedSessionsCount / program.totalSessions) * 100),
                status: enrollment.status,
                // Mock vitals trend for now
                vitalsTrend: {
                    bloodPressure: "improving",
                    averageBPBefore: "130/85",
                    averageBPCurrent: "125/82"
                },
                nextSession: {
                    sessionNumber: enrollment.currentSessionIndex,
                    title: `Session ${enrollment.currentSessionIndex}: Standard Protocol`, // Stub
                    scheduledFor: new Date().toISOString()
                }
            }
        });
    });

    // Get Sessions
    getEnrolledSessions = catchAsync(async (req, res, next) => {
        const enrollment = await Enrollment.findOne({ user: req.user.id, program: req.params.id });

        if (!enrollment) {
            return next(new AppError('You are not enrolled in this program', 403));
        }

        res.status(200).json({
            status: 'success',
            data: {
                sessions: enrollment.sessions
            }
        });
    });

    // Start Session
    startSession = catchAsync(async (req, res, next) => {
        const { id: programId, sessionId } = req.params;
        const { vitalsCheck } = req.body;

        // Find or Create Enrollment (Auto-enroll on first start if needed)
        let enrollment = await Enrollment.findOne({ user: req.user.id, program: programId });

        if (!enrollment) {
            enrollment = await Enrollment.create({
                user: req.user.id,
                program: programId,
                status: 'active',
                currentSessionIndex: 1
            });
        }

        // Add new session log
        enrollment.sessions.push({
            sessionNumber: enrollment.currentSessionIndex,
            sessionId: sessionId || `sess_${enrollment.currentSessionIndex}`, // Fallback ID
            status: 'in-progress',
            startTime: Date.now(),
            vitalsCheck
        });

        await enrollment.save();

        res.status(200).json({
            status: 'success',
            message: 'Session started',
            data: { session: enrollment.sessions[enrollment.sessions.length - 1] }
        });
    });

    // Complete Session
    completeSession = catchAsync(async (req, res, next) => {
        const { id: programId, sessionId } = req.params;
        const { vitalsAfter, notes, duration } = req.body;

        const enrollment = await Enrollment.findOne({ user: req.user.id, program: programId });
        if (!enrollment) return next(new AppError('Enrollment not found', 404));

        // Find the active session (simplified: assuming last one or matching ID)
        // For robustness, find by sessionId if provided, else last
        let session = enrollment.sessions.find(s => s.sessionId === sessionId || s._id.toString() === sessionId);

        // If searching by sessionNumber from params
        if (!session) {
            // Fallback: update the last session if it's in-progress
            session = enrollment.sessions[enrollment.sessions.length - 1];
        }

        if (session) {
            session.status = 'completed';
            session.endTime = Date.now();
            session.duration = duration;
            session.vitalsAfter = vitalsAfter;
            session.notes = notes;
        }

        // Update progress
        enrollment.completedSessionsCount += 1;
        enrollment.currentSessionIndex += 1; // Advance to next

        // Check if program finished
        const program = await Program.findById(programId);
        if (enrollment.completedSessionsCount >= program.totalSessions) {
            enrollment.status = 'completed';
        }

        await enrollment.save();

        res.status(200).json({
            status: 'success',
            message: 'Session completed',
            data: {
                progressPercentage: Math.round((enrollment.completedSessionsCount / program.totalSessions) * 100),
                enrollment
            }
        });
    });
}

module.exports = new ProgramController();
