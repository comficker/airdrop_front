const RestfulRepo = (app, item) => {
  let out = {
    list: async (query) => {
      let q = {};
      Object.keys(query).forEach(field => {
        if (Array.isArray(query[field])) {
          q[field] = query[field].toString()
        } else {
          q[field] = query[field]
        }
      });
      return await app.$axios.$get(`/${item.space}/${item.endpoint}/`, {params: q}).then(res => {
        if (res.results === null) {
          res.results = []
        }
        return res
      });
    },
    create: async (body) => {
      return await app.$axios.$post(`/${item.space}/${item.endpoint}/`, body)
    },
    get: async (id, query) => {
      return await app.$axios.$get(`/${item.space}/${item.endpoint}/${id}/`, query)
    },
    update: async (id, body) => {
      return await app.$axios.$put(`/${item.space}/${item.endpoint}/${id}/`, body)
    },
    delete: async (id) => {
      return await app.$axios.$delete(`/${item.space}/${item.endpoint}/${id}/`)
    }
  };
  if (item.methods) {
    item.methods.forEach(callback => {
      if (callback.hasId) {
        out[callback.name] = async (id, body) => {
          return await app.$axios[callback.method](`/${item.space}/${item.endpoint}/${id}/${callback.endpoint}`, body)
        }
      } else {
        out[callback.name] = async (body) => {
          return await app.$axios[callback.method](`/${item.space}/${callback.endpoint}`, body)
        }
      }
    })
  }
  return out
};

const apis_module = [
  {space: 'auth', endpoint: 'wallets', name: 'wallet', methods: []},
  {space: 'media', endpoint: 'medias', name: 'media', methods: []},
  {space: 'project', endpoint: 'tokens', name: 'token'},
  {space: 'project', endpoint: 'properties', name: 'property'},
  {
    space: 'project', endpoint: 'events', name: 'event',
    methods: [
      {hasId: true, name: 'join', method: '$post', endpoint: 'join'},
      {hasId: true, name: 'follow', method: '$post', endpoint: 'follow'}
    ]
  },
  {
    space: 'project',
    endpoint: 'projects',
    name: 'project'
  },
];

export default function (app, inject) {
  const API = {};
  apis_module.forEach(item => {
    API[item.name] = RestfulRepo(app, item);
  });
  app.$api = API;
  inject('api', API);
}
