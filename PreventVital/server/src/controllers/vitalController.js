const Vital = require('../models/Vital');

const User = require('../models/User');

exports.getMyVitals = async (req, res) => {
    try {
        const vitals = await Vital.find({ userId: req.user._id })
            .sort({ timestamp: -1 })
            .limit(20);

        res.status(200).json({
            status: 'success',
            results: vitals.length,
            data: {
                vitals
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.logVitals = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bloodPressure, heartRate, glucose, spo2, weight } = req.body;
        const timestamp = Date.now();

        // 1. Save individual history records
        const vitalsToSave = [];

        if (bloodPressure) {
            vitalsToSave.push({ userId, vitalType: 'blood_pressure', value: bloodPressure, unit: 'mmHg', timestamp });
        }
        if (heartRate) {
            vitalsToSave.push({ userId, vitalType: 'heart_rate', value: heartRate, unit: 'bpm', timestamp });
        }
        if (glucose) {
            vitalsToSave.push({ userId, vitalType: 'blood_glucose', value: glucose, unit: 'mg/dL', timestamp });
        }
        if (spo2) {
            vitalsToSave.push({ userId, vitalType: 'spo2', value: spo2, unit: '%', timestamp });
        }
        if (weight) {
            vitalsToSave.push({ userId, vitalType: 'weight', value: weight, unit: 'kg', timestamp });
        }

        if (vitalsToSave.length > 0) {
            await Vital.insertMany(vitalsToSave);
        }

        // 2. Update User's latestVitals
        const updateData = {
            'latestVitals.lastUpdated': timestamp
        };
        if (bloodPressure) updateData['latestVitals.bloodPressure'] = bloodPressure;
        if (heartRate) updateData['latestVitals.heartRate'] = heartRate;
        if (glucose) updateData['latestVitals.glucose'] = glucose;
        if (spo2) updateData['latestVitals.spo2'] = spo2;

        // Update weight in profile if provided
        if (weight) {
            updateData['profile.weight'] = weight;

            // Calculate and update BMI if height is available
            const user = await User.findById(userId);
            if (user && user.profile && user.profile.height) {
                const heightInMeters = user.profile.height / 100;
                const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
                updateData['profile.bmi'] = parseFloat(bmi);
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

        // Calculate Score immediately for response
        let vitalScore = null;
        try {
            const VitalScoreCalculator = require('../utils/VitalScoreCalculator');
            const calculator = new VitalScoreCalculator();
            vitalScore = calculator.calculateVitalScore({
                bloodPressure: updatedUser.latestVitals.bloodPressure,
                heartRate: updatedUser.latestVitals.heartRate,
                glucose: updatedUser.latestVitals.glucose,
                spo2: updatedUser.latestVitals.spo2,
                bmi: updatedUser.profile.bmi, // Assuming BMI is calculated elsewhere or we should calc it here?
                timestamp
            });
        } catch (e) { console.log('Score calc error', e.message); }

        res.status(200).json({
            status: 'success',
            message: 'Vitals logged successfully',
            data: {
                user: updatedUser,
                vitalScore
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
