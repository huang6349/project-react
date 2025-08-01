const withData = (fn: any): any => ((params: any) => {
  return fn(params)?.then((data: any) => {
    const {
      data: res,
    } = data || {};
    return res;
  });
});

export default withData;
