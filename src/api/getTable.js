import request from './request'

export const getAbsolueExpression = () => {
  return request({
    url: '/data/AE.json',
    method: 'get'
  })
}
export const getDifferentialExpression = () => {
  return request(
    {
      url: '/data/DE.json',
      method: 'get'
    })
}
export const getSingleCellExpression = () => {
  return request(
    {
      url: '/data/single_cell.json',
      method: 'get'
    })
}

// Function to fetch dataset details from PRIDE API
export const getPrideDatasetDetails = (accessionId) => {
  return request({
    url: `https://www.ebi.ac.uk/pride/ws/archive/v3/projects/${accessionId}`,
    method: 'get'
  });
};

// Function to fetch dataset details from ProteomeCentral PROXI API
export const getProxiDatasetDetails = (accessionId) => {
  return request({
    url: `http://proteomecentral.proteomexchange.org/api/dataset/${accessionId}`,
    method: 'get'
  });
};
