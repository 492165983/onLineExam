// 银行从业资格证
import Bank from '../pages/Bank/index.vue'



import HelloWorld from '../components/HelloWorld.vue'

// 银行考试页面   等其他二级路由页面
import BankTest from '../pages/Bank/BankTest/index.vue'



const routes =[
  {
    path:'/',
    redirect:'/helloWorld',
  },
  {
    path:'/helloWorld',
    component:HelloWorld,
    name:'helloWorld',
    meta: { isShow:true },
  },

  {
    //银行从业资格
    path:'/bank',
    name:'bank',
    component:Bank,
    // children:[
    //   {
    //   path:'/bankTest',
    //   name:'bankTest',
    //   component: BankTest,
    //   }
    // ]
  },
  {
    path:'/bankTest',
    name:'bankTest',
    component: BankTest,
  },
 

]


export default routes
