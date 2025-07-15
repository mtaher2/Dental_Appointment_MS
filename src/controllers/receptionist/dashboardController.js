const dashboardController = {
    // Render the receptionist dashboard
    getDashboard: async (req, res) => {
        try {
            // TODO: Fetch real data from database
            // For now, using sample data
            const dashboardData = {
                checkIns: 15,
                cancellations: 2,
                statusUpdates: 10,
                appointments: [
                    {
                        id: 1,
                        patientName: 'Clara Bennett',
                        appointmentTime: '9:00 AM',
                        serviceType: 'General Checkup',
                        doctorName: 'Dr. Olivia Carter',
                        room: 'Room 101',
                        status: 'Scheduled'
                    },
                    {
                        id: 2,
                        patientName: 'Owen Foster',
                        appointmentTime: '9:30 AM',
                        serviceType: 'Dental Cleaning',
                        doctorName: 'Dr. Nathan Evans',
                        room: 'Room 202',
                        status: 'Checked In'
                    },
                    {
                        id: 3,
                        patientName: 'Emma Hayes',
                        appointmentTime: '10:00 AM',
                        serviceType: 'Eye Exam',
                        doctorName: 'Dr. Sophia Reed',
                        room: 'Room 301',
                        status: 'In Progress'
                    },
                    {
                        id: 4,
                        patientName: 'Lucas Walker',
                        appointmentTime: '10:30 AM',
                        serviceType: 'Physical Therapy',
                        doctorName: 'Dr. Ethan Miller',
                        room: 'Room 401',
                        status: 'Completed'
                    },
                    {
                        id: 5,
                        patientName: 'Ava Morgan',
                        appointmentTime: '11:00 AM',
                        serviceType: 'Dermatology Consultation',
                        doctorName: 'Dr. Chloe Lewis',
                        room: 'Room 501',
                        status: 'Scheduled'
                    }
                ],
                checkInQueue: [
                    {
                        id: 6,
                        patientName: 'Liam Walker',
                        appointmentTime: '11:30 AM',
                        serviceType: 'General Checkup',
                        doctorName: 'Dr. Olivia Carter',
                        room: 'Room 101'
                    },
                    {
                        id: 7,
                        patientName: 'Isabella Hayes',
                        appointmentTime: '12:00 PM',
                        serviceType: 'Dental Cleaning',
                        doctorName: 'Dr. Nathan Evans',
                        room: 'Room 202'
                    },
                    {
                        id: 8,
                        patientName: 'Jackson Cooper',
                        appointmentTime: '12:30 PM',
                        serviceType: 'Eye Exam',
                        doctorName: 'Dr. Sophia Reed',
                        room: 'Room 301'
                    }
                ],
                missedAppointments: [
                    {
                        id: 9,
                        patientName: 'Mia Bennett',
                        appointmentTime: '2:00 PM',
                        serviceType: 'General Checkup',
                        doctorName: 'Dr. Olivia Carter',
                        room: 'Room 101'
                    },
                    {
                        id: 10,
                        patientName: 'Lucie Carter',
                        appointmentTime: '2:20 PM',
                        serviceType: 'Dental Cleaning',
                        doctorName: 'Dr. Nathan Evans',
                        room: 'Room 202'
                    }
                ]
            };

            res.render('pages/receptionist/dashboard', {
                title: 'Receptionist Dashboard',
                success_msg: '',
                error_msg: '',
                ...dashboardData
            });
        } catch (error) {
            console.error('Error rendering receptionist dashboard:', error);
            res.status(500).render('pages/receptionist/dashboard', {
                title: 'Receptionist Dashboard',
                success_msg: '',
                error_msg: 'Error loading dashboard data'
            });
        }
    },

    // Handle patient check-in
    checkInPatient: async (req, res) => {
        try {
            const { patientId } = req.body;
            
            // TODO: Update patient status in database
            console.log('Checking in patient:', patientId);
            
            res.json({ 
                success: true, 
                message: 'Patient checked in successfully' 
            });
        } catch (error) {
            console.error('Error checking in patient:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error checking in patient' 
            });
        }
    },

    // Handle appointment rebooking
    rebookAppointment: async (req, res) => {
        try {
            const { appointmentId } = req.body;
            
            // TODO: Implement rebooking logic
            console.log('Rebooking appointment:', appointmentId);
            
            res.json({ 
                success: true, 
                message: 'Appointment rebooked successfully' 
            });
        } catch (error) {
            console.error('Error rebooking appointment:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error rebooking appointment' 
            });
        }
    },

    // Add reason for missed appointment
    addReason: async (req, res) => {
        try {
            const { appointmentId, reason } = req.body;
            
            // TODO: Add reason to database
            console.log('Adding reason for appointment:', appointmentId, reason);
            
            res.json({ 
                success: true, 
                message: 'Reason added successfully' 
            });
        } catch (error) {
            console.error('Error adding reason:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error adding reason' 
            });
        }
    },

    // Tag patient for missed appointment
    tagPatient: async (req, res) => {
        try {
            const { appointmentId, tag } = req.body;
            
            // TODO: Add tag to patient in database
            console.log('Tagging patient for appointment:', appointmentId, tag);
            
            res.json({ 
                success: true, 
                message: 'Patient tagged successfully' 
            });
        } catch (error) {
            console.error('Error tagging patient:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error tagging patient' 
            });
        }
    }
};

module.exports = dashboardController; 