export default async (ctx, next) => {
    const start :any = new Date;
    await next();
    const end :any = new Date;
    const ms: number = end - start;
    
    ctx.set('X-Response-Time', `${ms}`);
};
