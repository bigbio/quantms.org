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
    url: '/data/proteinTable.json.gz',
    responseType: 'arraybuffer'
  })
}

export const getCellLineProteins = () => {
  return request({
    method: 'get',
    url: '/data/Cell_lines_IBAQ.json.gz',
    responseType: 'arraybuffer'
  })
}
