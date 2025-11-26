const { default: autoBind } = require("auto-bind");
const courseModel = require("../../model/course.model");
const createHttpError = require("http-errors");
const courseMessage = require("./course.message");
const { Charsets } = require("mysql2");
const chapterModel = require("../../model/chapter.model");
const episodeModel = require("../../model/episode.model");

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
    const { title, summary, image, duration, support, content, chspters } =
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
    if (Array.isArray(chspters)) {
      for (const chapterData of chspters) {
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
            await this.#episodeModel.bulkBuild(episodeList);
          }
        }
      }
    }
    return {
      messgae: "دوره با موفقیت افزوده شد",
    };
  }
  async updateCourse(data) {}
  async findAllCourse(data) {}
  async findOneByIdCourse(data) {}
  async deleteCourse(data) {}
}

module.exports = new CourseService();
