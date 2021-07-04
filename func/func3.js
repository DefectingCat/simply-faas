module.exports = (event, ctx) => {
  Promise.resolve().then(() => {
    while (1) {}
  });
  return { message: 'this is function2!!!', status: 'ok ' };
};
