const User = require('./user');
const Journal = require('./Journal');
const Notify = require('./Notify');
const Sign = require('./Sign');

const dbs = {
    User,
    Journal,
    Notify,
    Sign,
};

// add associations here
// 1. User has many journals (1:m)
User.hasMany(Journal, { as: 'Journals' });
Journal.belongsTo(User);
// 2. User has one doctor
User.hasMany(User, {as: 'patients', foreignKey: 'DoctorId'});
User.belongsTo(User, {as: 'doctor', foreignKey: 'DoctorId'});
// 3. many to many (User and Notification)
User.hasMany(Notify, { as: 'docNotifs', foreignKey: 'DocId'});
User.hasMany(Notify, { as: 'patientNotifs', foreignKey: 'PatientId'});
Notify.belongsTo(User, { as: 'notifications', foreignKey: 'DocId'});
Notify.belongsTo(User, { as: 'myNotifications', foreignKey: 'PatientId'});
// 4. 1 User can create many signs
User.hasMany(Sign, { as: 'signs'});
Sign.belongsTo(User);

module.exports = dbs;