import service from 'utils/service';
const taskInfoApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/taskInfo/add' : '/taskInfo/update';
    return service.post(apiUrl, params);
  },
  delete: (params) => {
    return service.post('/taskInfo/delete', params);
  },
  detail: (params) => {
    return service.post('/taskInfo/detail', params);
  },
  list: (params) => {
    return service.post('/taskInfo/list', params);
  }
};
export default taskInfoApi;
