(event, context) => {
  Promise.resolve().then(() => {
    while (1) {}
  });
  return { message: 'this is function2!!!', status: 'ok ' };
};
