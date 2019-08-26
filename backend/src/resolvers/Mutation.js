const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
          // same things
          // title: args.title,
          // description: args.desc
        }
      },
      info
    );

    console.log(item);

    return item;
  },
  updateItem(parent, args, ctx, info) {
    // 1. first take a copy of the updates
    const updates = { ...args };
    // 2. remove the ID from the updates
    delete updates.id;
    // 3. run the update method
    return ctx.db.mutation.updateItem(
      {
        date: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. Find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 2. Check if they own that item,or have the permission
    // TODO
    // 3. Delete it!!!
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
