import Layout from '../views/layout/Layout'

var routerlist = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/roles/index'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'router',
        name: 'Router',
        component: () => import('@/views/router/index'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export function isrouterlist(routerpath, obj) {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].path === routerpath) {
      return obj[i]
    }
  }
  return ''
}
function isrouter(routerlist, obj) {
  for (let i = 0; i < routerlist.length; i++) {
    const rt = isrouterlist(routerlist[i].path, obj)
    if (rt) {
      const o = {}
      if (rt.button.length > 0) {
        for (let j = 0; j < rt.button.length; j++) {
          const name = rt.button[j].name
          const value = rt.button[j].value
          o[name] = value
        }
      }
      const meta = o
      routerlist[i].meta = meta
      if (routerlist[i].children) {
        if (routerlist[i].children.length > 0) {
          isrouter(routerlist[i].children, obj)
        }
      }
    } else {
      routerlist.splice(i, 1)
      i = i - 1
    }
  }
}
export { routerlist, isrouter }
