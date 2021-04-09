const User = require('./user');
const Journal = require('./Journal');
const Notify = require('./Notify');
const Sign = require('./Sign');
const Tag = require('./Tags');
const Post = require('./Post');
const Like = require('./Like')

const dbs = {
    User,
    Journal,
    Notify,
    Sign,
    Tag,
    Post,
    Like,
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

// 4. User can create many signs
User.hasMany(Sign, { as: 'signs'});
Sign.belongsTo(User);

// 5. Post has many tags
Post.hasMany(Tag, { as: 'tags' });

//6. User can like many posts, post can bee liked by many users (m:n)
User.hasMany(Like, { as:'likedPosts' })
Post.hasMany(Like, { as: 'Likes'})
Like.belongsTo(User);
Like.belongsTo(Post);
// User.belongsToMany(Post, { as:'likedPosts', through: 'likes' });
// Post.belongsToMany(User, { as:'likedUsers', through: 'likes' });


// 5. User can create many posts
User.hasMany(Post, {as:'myPosts', foreignKey:'CreatorId'});


module.exports = dbs;