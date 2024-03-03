export const ApiMethod = {
    Get: 'GET', Post: 'POST',
  }
  export const ApiEndpoints = {
    punk:{
        getAllData: (page,size,abv) => `v2/beers?page=${page}&per_page=${size}&&abv_gt=${abv}`
    },
  }