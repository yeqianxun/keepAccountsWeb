const Tag = require('../model/admin')
const Op = require('sequelize').Op


const loginIn = async (ctx) => {
  const user = ctx.request.body
  const data = await Tag.findOne({
    where: {
      username: {
        [Op.eq]: `${user.userName}`
      },
      password: user.password
    }
  })
  ctx.body = {
    code: data ? 1000 : 1003,
    data,
    desc: data ? '登陆成功' : '账号或密码错误'
  }
}
let checkLogin = async ctx => {

}
module.exports = {
  loginIn
}