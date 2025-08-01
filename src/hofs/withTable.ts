const withTable = (fn: any): any => ((params: any) => {
  const {
    current: pageNumber,
    pageSize,
    ...queries
  } = params || {};
  return fn?.({
    pageNumber,
    pageSize,
    ...queries,
  })?.then((response: any) => {
    const {
      data: result,
    } = response || {};
    const {
      totalRow,
      records,
      total,
      list,
    } = result || {};
    return ({
      ...response,
      total: totalRow || total,
      data: records || list,
    });
  });
});

export default withTable;
