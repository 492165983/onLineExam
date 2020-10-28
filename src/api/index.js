import axios from './axios'

// 允许跨域携带cookie
axios.defaults.withCredentials = true;

/* 携带 token*/
axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMjM0NTYiLCJzdWIiOiJ7XCJ1c2VySWRcIjoxMjgwNzEyODQyNDQxMjI0MTk1LFwidXNlck5hbWVcIjpcInhpYW9odWFodWFcIixcInJvbGVJZExpc3RcIjpbXCJ1c2VyX3JvbGVcIl19IiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiJYLXJhcGlkbyIsImlzcyI6InhpYW9odWFodWEiLCJleHAiOjE2MDYyOTg4NDUsImlhdCI6MTYwMzcwNjg0NSwianRpIjoiMTI4MDcxMjg0MjQ0MTIyNDE5NSJ9.CjNoj9YA4IWlFjBbmtTeb0kg-jZWq2JSuAy-fiRGEm4'

//* 请求在线考试 */
export const reqOnlineExam =(id) => axios ({
  method:'POST',
  url:'/userService/userExam/getFirstExamTitle',
  data:{
    id:id
  }
})

/* 获取下一题*/
export const reqNextExam =(answer,checkTitleNum,examPaperId,nextTitleNum) => axios({
  method:'post',
  url:'/userService/userExam/getNextExamTitle',
  data:{
    answer:answer,
    checkTitleNum:checkTitleNum,
    examPaperId:examPaperId,
    nextTitleNum:nextTitleNum
  }
})

/* 获取考试详情 */
export const reqExamDetail = (id) =>axios ({
  method:'post',
  url:'/userService/userExam/getExamInfo',
  data:{
    id:id
  }
})


/* 获取首页题目分类 */
export const reqOnlineExamGetExamType =() => axios ({
    method:'POST',
    url:'/userService/userExam/getExamType'
  })

  /* 获取考试信息 */
export const reqOnlineExamGetExamInfo =(id) => axios ({
    method:'POST',
    url:'/userService/userExam/getExamInfo',
    data:{
      id:id,
    }
  })
