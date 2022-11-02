const cookieparser = process['server'] ? require('cookieparser') : undefined;

export default async function (context, inject) {
  const $auth = {};
  const logout = async () => {
    await setToken(null);
    await setUser(null);
  };
  const login = async (credential) => {
    let res = await context.$axios.$post('/auth/token', credential).catch(e => {
      return null
    });
    if (res) {
      await setToken(res['access']);
      await setUser(await getUser());
    }
    return res
  };
  const register = async (credential) => {
    return await context.$axios.$post('/auth/user', credential).catch(e => {
      console.log(e);
      return null
    });
  };
  const getUser = async () => {
    try {
      return await context.$axios.$get('/auth/user');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        await logout();
      }
      return null;
    }
  };
  const getToken = async () => {
    let token = null;
    if (process['server'] && context.req.headers.cookie) {
      const parsed = cookieparser.parse(context.req.headers.cookie);
      token = parsed['auth.token'];
    } else {
      token = context.store.$ck.get('auth.token');
    }
    return token;
  };
  const setToken = async (token) => {
    if (token) {
      context.$axios.setHeader('Authorization', 'Bearer ' + token);
      context.store.$ck.set('auth.token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });
    } else {
      context.$axios.setHeader('Authorization', undefined);
      context.store.$ck.remove('auth.token');
    }
  };
  const setUser = async (user) => {
    await context.store.commit('auth/SET_USER', user);
  };
  const init = async () => {
    let token = await getToken();
    await setToken(token);
    if (token) {
      await setUser(await getUser());
    }
  };

  await init();

  $auth.login = login;
  $auth.register = register;
  $auth.logout = logout;
  context.$auth = $auth;
  inject('auth', $auth);
}
