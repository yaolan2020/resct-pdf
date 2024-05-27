import service from 'utils/service';
const dimLabelContentApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/dimLabelContent/add' : '/dimLabelContent/update';
    return service.post(apiUrl, params);
  },
  delete: (params) => {
    return service.post('/dimLabelContent/delete', params);
  },
  detail: (params) => {
    return service.post('/dimLabelContent/detail', params);
  },
  list: (params) => {
    return service.post('/dimLabelContent/list', params);
  },
  getCheckboxOptions: () => {
    return service.post('/dimLabelContent/getCheckboxOptions');
  },
  addBatch: (params) => {
    return service.post('/dimLabelContent/addBatch', params);
  }
};
export default dimLabelContentApi;
