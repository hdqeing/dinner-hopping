import {createRouter, createWebHashHistory} from 'vue-router'


const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const ForOneSelf = () => import('@/views/ForOneSelf.vue')
const WithAFriend = () => import('@/views/WithAFriend.vue')
const NotFound = () => import('@/views/errors/404.vue')

const routes = [
  { path:'/', name:'Home', component: Home },
  { path:'/about', name:'About', component: About },
  { path:'/for-oneself', name:'ForOneSelf', component: ForOneSelf },
  { path:'/with-a-friend', name:'WithAFriend', component: WithAFriend },
  { path: '/:pathMatch(.*)*', name:'NotFound', component: NotFound}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router