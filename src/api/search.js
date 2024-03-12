import request from './request'
export const queryKey = (proteinName) => {
  const param = new URLSearchParams()
  param.append('protein_name', proteinName)
  return request({
    method: 'post',
    url: 'query',
    data: param
  })
}

export const getProteins = () => {
  return request({
    method: 'get',
    url: '/data/tissueJson.json.gz',
    responseType: 'arraybuffer'
  })
}

export const getCellLineProteins = () => {
  return request({
    method: 'get',
    url: '/data/cellJson.json.gz',
    responseType: 'arraybuffer'
  })
}
