const sequelize = require("./config/db.config");
const Chapter = require("./model/chapter.model");
const Course = require("./model/course.model");
const User = require("./model/user.model");
const Episode = require("./model/episode.model");

Course.hasMany(Chapter, {
  foreignKey: "courseId",
  as: "chapters",
});
Chapter.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

Chapter.hasMany(Episode, {
  foreignKey: "chapterId",
  as: "episodes",
});

Episode.belongsTo(Chapter, {
  foreignKey: "chapterId",
  as: "chapter",
});

const syncModels = async () => {
  await sequelize.sync({ force: true });
};

module.exports = {
  syncModels,
  Course,
  Chapter,
  Episode,
};
