import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [{
      path: 'index',
      component: () => import('../views/Index.vue'),
      meta: {
        crumb: ['首页']
      }
    }, {
      path: 'actor-list',
      component: () => import('../views/actor/ActorList.vue'),
      meta: {
        crumb: ['演员管理', '演员列表']
      }
    }, {
      path: 'actor-add',
      component: () => import('../views/actor/ActorAdd.vue'),
      meta: {
        crumb: ['演员管理', '添加新演员']
      }
    }, {
      path: 'director-list',
      component: () => import('../views/director/DirectorList.vue'),
      meta: {
        crumb: ['导演管理', '导演列表']
      }
    }, {
      path: 'director-add',
      component: () => import('../views/director/DirectorAdd.vue'),
      meta: {
        crumb: ['导演管理', '新增导演']
      }
    }, {
      path: 'movie-list',
      component: () => import('../views/movie/MovieList.vue'),
      meta: {
        crumb: ['电影管理', '电影列表']
      }
    }, {
      path: 'movie-add',
      component: () => import('../views/movie/MovieAdd.vue'),
      meta: {
        crumb: ['电影管理', '新增电影']
      }
    }, {
      path: 'movie-update/:id',
      component: () => import('../views/movie/MovieUpdate.vue'),
      meta: {
        crumb: ['电影管理', '电影列表:/home/movie-list', '修改电影信息']
      }
    }, {
      path: 'cinema-list',
      component: () => import('../views/cinema/CinemaList.vue'),
      meta: {
        crumb: ['影院管理', '影院列表']
      }
    }, {
      path: 'cinema-add',
      component: () => import('../views/cinema/CinemaAdd.vue'),
      meta: {
        crumb: ['影院管理', '新增电影院']
      }
    }, {
      path: 'cinema-room/:id',
      component: () => import('../views/cinema/CinemaRoom.vue'),
      meta: {
        crumb: ['影院管理', '电影院列表:/home/cinema-list', '放映厅列表']
      }
    }, {
      path: 'plan-add/:roomId',
      component: () => import('../views/cinema/ShowingonPlanAdd.vue'),
      meta: {
        crumb: [
          '影院管理',
          '电影院列表:/home/cinema-list',
          '放映厅列表',
          '新增排片计划'
        ]
      }
    }, {
      path: 'plan-list/:roomId',
      component: () => import('../views/cinema/ShowingonPlanList.vue'),
      meta: {
        crumb: [
          '影院管理',
          '电影院列表:/home/cinema-list',
          '放映厅列表',
          '排片计划列表'
        ]
      }
    }, {
      path: 'seat-template/:id',
      component: () => import('../views/cinema/CinemaRoomSeatTemplate.vue'),
      meta: {
        crumb: [
          '影院管理',
          '电影院列表:/home/cinema-list',
          '放映厅列表',
          '配置座位模板'
        ]
      }
    }]
  },
  {
    path: '/user/login',
    component: () => import('../views/user/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
