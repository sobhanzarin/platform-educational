const sequelize = require("./config/db.config");
const Chapter = require("./model/chapter.model");
const Course = require("./model/course.model");
const User = require("./model/user.model");
const Episode = require("./model/episode.model");

// Course -> chapter
Course.hasMany(Chapter, {
  foreignKey: "courseId",
  as: "chapters",
});
Chapter.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// Chapter -> Episode
Chapter.hasMany(Episode, {
  foreignKey: "chapterId",
  as: "episodes",
  onDelete: "CASCADE",
});

Episode.belongsTo(Chapter, {
  foreignKey: "chapterId",
  as: "chapter",
  onDelete: "CASCADE",
});

// user -> course
User.hasMany(Course, {
  foreignKey: "teacherId",
  as: "courses",
  onUpdate: "SET NULL",
});
Course.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
  onUpdate: "SET NULL",
});

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  syncModels,
  Course,
  Chapter,
  Episode,
};
