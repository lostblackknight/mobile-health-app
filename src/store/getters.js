const getters = {
  token: state => state.member.token,
  avatar: state => state.member.avatar,
  name: state => state.member.name,
  roles: state => state.member.roles,
  status: state => state.member.status,
  uid: state => state.member.uid,
  active: state => state.search.active,
  permission_routes: state => state.permission.routes
}

export default getters
