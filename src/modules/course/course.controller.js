const { default: autoBind } = require("auto-bind");
const CourseService = require("./course.service");

class CourseController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CourseService;
  }
  async createCourseHandel(req, res, next) {
    const { id: userId } = req.user;
    const { title, summary, image, duration, support, content, chapters } =
      req.body;
    const data = {
      title,
      teacherId: userId,
      summary,
      image,
      duration,
      support,
      content,
      chapters,
    };
    const result = await this.#service.createCourse(data);
    return res.json({
      error: null,
      data: result,
    });
  }
  async findAllCourseHandel(req, res, next) {
    const result = await this.#service.findAllCourse();
    return res.json({
      error: null,
      data: result,
    });
  }
  async findOneByIdCourseHandel(req, res, next) {
    const { id } = req.params;
    const result = await this.#service.findOneByIdCourse(id);
    return res.json({
      error: null,
      data: result,
    });
  }
  async deleteCourseHandel(req, res, next) {
    const { id } = req.params;
    const result = await this.#service.deleteCourse(id);
    return res.json({
      error: null,
      data: result,
    });
  }
  async updateCourseHandel(req, res, next) {}
}

module.exports = new CourseController();
