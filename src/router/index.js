import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: ()=> import('@/views/login/RegisterPage.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/HomePage.vue'),
    },
    {
      path: '/book/:id',
      name: 'BookDetail',
      component: () => import('@/views/book/BookDetail.vue'),
      props: true,  // 使动态参数作为 props 传递给组件
    },
    {
      path: '/book/:bookId/chapter/:chapterId',
      name: 'BookContent',
      component: ()=> import('@/views/book/BookContent.vue'),
      props: true,
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: ()=> import('@/views/Home/CategoryPage.vue'),
      props: true,
    },
    {
      path: '/all',
      name: 'All',
      component: ()=> import('@/views/all/AllPage.vue'),
      props: true
    },
    {
      path: '/test',
      component: ()=> import('@/views/TestPage.vue')
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/rank/RankLayoutContainer.vue'),
      redirect: '/rank/',
      children: [
        {
          path: '/rank/',
          name: 'AllRank',
          component: () =>import('@/views/rank/AllRank.vue')
        },
        {
          path: '/rank/pass',
          name: 'PassRank',
          component: () => import('@/views/rank/PassRank.vue'),
        },
        {
          path: '/rank/selling',
          name: 'SellingRank',
          component: () => import('@/views/rank/SellingRank.vue'),
        },
        {
          path: '/rank/new',
          name: 'NewRank',
          component: () => import('@/views/rank/NewRank.vue'),
        },
        {
          path: '/rank/recommend',
          name: 'RecommendRank',
          component: () => import('@/views/rank/RecommendRank.vue'),
        },
        {
          path: '/rank/collection',
          name: 'CollectionRank',
          component: () => import('@/views/rank/CollectionRank.vue'),
        },
        {
          path: '/rank/words',
          name: 'wordsRank',
          component: () => import('@/views/rank/WordsRank.vue'),
        }
      ],
    },
    {
      path: '/search/:words?',
      name: 'Search',
      component: ()=> import('@/views/search/SearchPage.vue'),
      props: true
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/UserLayoutContainer.vue'),
      redirect: '/user/',
      children: [
        {
          path: '/user/',
          name: 'UserProfile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/account',
          name: 'UserAccount',
          component: () => import('@/views/user/UserAccount.vue'),
        },
        {
          path: '/user/bookshelf',
          name: 'UserBookshelf',
          component: () => import('@/views/user/UserBookshelf.vue'),
        },
        {
          path: '/user/tickets',
          name: 'UserTickets',
          component: () => import('@/views/user/UserTickets.vue'),
        },
        {
          path: '/user/reviews',
          name: 'UserReviews',
          component: () => import('@/views/user/UserReviews.vue'),
        },
        {
          path: '/user/setting',
          name: 'UserSetting',
          component: () => import('@/views/user/UserSetting.vue'),
        },
      ],
    },

  ],
})

export default router
