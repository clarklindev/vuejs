import { createRouter, createWebHistory } from "vue-router";

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),  
    routes:[
        {path: '/', redirect: '/teams'},
        { 
            name:'teams', 
            path: '/teams', 
            meta:{needsAuth:true},
            components:{
                default: TeamsList,
                footer: TeamsFooter
        }, children:[
            { name: 'team-members', path: ':teamId', component:TeamMembers, props:true},  // /teams/t1
        ]},
        { 
            path:'/users', 
            components:{
                default: UsersList,
                footer: UsersFooter
            }, 
            beforeEnter(to, from, next){
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            }
        },
        {path: '/:notFound(.*)', component: NotFound }
    ],

    // scrollBehavior(to, from, savedPosition){
    scrollBehavior(_, _2, savedPosition){
    // console.log(to, from, savedPosition);
        if(savedPosition){
            return savedPosition;
        }
        return {left:0, top:0}
    }
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);

  // next(false);
  
  //if check prevents an infinite loop
//   if (to.name === 'team-members') {
//     next();
//   } else {
//     next({ name: 'team-members', params: { teamId: 't2' } });
//   }

    if(to.meta.needsAuth){
        //check if user is authenticated then next()
        next();
    }else{
        next();
    }
});

router.afterEach(function (to, from) {
    console.log(to, from)
});

export default router;