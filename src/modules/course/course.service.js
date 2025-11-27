const { default: autoBind } = require("auto-bind");
const courseModel = require("../../model/course.model");
const createHttpError = require("http-errors");
const courseMessage = require("./course.message");
const { Charsets } = require("mysql2");
const chapterModel = require("../../model/chapter.model");
const episodeModel = require("../../model/episode.model");
const { Model, where } = require("sequelize");
const Chapter = require("../../model/chapter.model");
const Episode = require("../../model/episode.model");

class CourseService {
  #courseModel;
  #chapterModel;
  #episodeModel;
  constructor() {
    autoBind(this);
    this.#courseModel = courseModel;
    this.#chapterModel = chapterModel;
    this.#episodeModel = episodeModel;
  }
  async createCourse(data) {
    const { title, summary, image, duration, support, content, chapters } =
      data;
    let course = await this.#courseModel.create({
      title,
      summary,
      image,
      duration,
      support,
      content,
    });
    let chapterIndex = 1;
    if (Array.isArray(chapters)) {
      for (const chapterData of chapters) {
        const { title, dexcription, episodes } = chapterData;
        let chapter = await this.#chapterModel.create({
          title,
          dexcription,
          order: chapterIndex,
          courseId: course.dataValues.id,
        });
        if (Array.isArray(episodes)) {
          let episodeList = episodes.map((episod) => {
            return {
              title: episod?.title,
              type: episod?.type,
              videoUrl: episod?.type === "free" ? episod?.videoUrl : null,
              chapterId: chapter.dataValues.id,
            };
          });
          if (episodeList.length > 0) {
            await this.#episodeModel.bulkCreate(episodeList);
          }
        }
      }
    }
    return {
      messgae: "دوره با موفقیت افزوده شد",
    };
  }
  async findAllCourse() {
    const courses = await this.#courseModel.findAll({
      where: {},
      attributes: ["id", "title", "duration", "content"],
    });
    return {
      courses,
    };
  }
  async findOneByIdCourse(id) {
    const course = await this.#courseModel.findOne({
      where: { id },
      attributes: ["id", "title", "duration", "content"],
      include: [
        {
          model: this.#chapterModel,
          as: "chapters",
          include: [
            {
              model: this.#episodeModel,
              as: "episodes",
            },
          ],
        },
      ],
    });
    if (!course)
      throw createHttpError.NotFound("دوره ای با این نشانه وجود نداشت.");
    return {
      course,
    };
  }
  async deleteCourse(id) {
    const { course } = await this.findOneByIdCourse(id);
    await this.#courseModel.destroy({ where: { id: course?.id } });
    return {
      messgae: "دوره باموفقیت حذف شد.",
    };
  }
  async updateCourse() {}

  // async checkExistCourseById(id) {
  //   const course = await this.#courseModel.findByPk({ where: { id } });
  //   if (!course)
  //     throw createHttpError.NotFound("دوره ای با این نشانه وجود نداشت.");
  //   return course;
  // }
}

module.exports = new CourseService();
