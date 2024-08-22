"use strict";

/**
 * profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", 
// @ts-ignore
({Strapi}) => ({
  async createMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        // @ts-ignore
        return ctx.badRequest(401, [{messages: "No athorized user found!"}])
      }
      // @ts-ignore
      const result = await strapi.entityService.create("api::profile.profile",{
        data:{
            // @ts-ignore
            fullName: ctx.request.body.fullName,          
            email: user.email,
            user: user.id
        }      
      });
      
      // @ts-ignore
      return result;
    } catch (err) {
      // @ts-ignore
      return ctx.badRequest(500, [{ messages: [{ id: "Error" }] }]);
    }
  },
  async getMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        // @ts-ignore
        return ctx.badRequest(401, [{ messages: "No athorized user found!" }]);
      }
      // @ts-ignore
      const result = await strapi.db.query('api::profile.profile').findOne({
        where:{
          user:{
            id:{
              $eq: user.id
            }
          }
        },
        populate: {
          image:true
        }
      })
      // @ts-ignore
      return result;
    } catch (err) {
      // @ts-ignore
      return ctx.badRequest(500, [{ messages: [{ id: "Error" }] }]);
    }
  },
})
);
