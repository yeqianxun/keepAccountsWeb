const { CarouselModel } = require("../model/index");
module.exports = {
    async getCarouselText(ctx, next) {
        let result = await CarouselModel.findAll();
        ctx.body = {
            code: 200,
            message: "获取首页优惠消息提示",
            data: result
        }
    }
}