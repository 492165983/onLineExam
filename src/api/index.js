import axios from './axios'

// 允许跨域携带cookie
axios.defaults.withCredentials = true;

/* 携带 token*/
axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMjM0NTYiLCJzdWIiOiJ7XCJ1c2VySWRcIjoxMjc4MjM2NjAxNzYxMDgzMzk0LFwidXNlck5hbWVcIjpcIjE4NjY0MzIxNzkyXCIsXCJyb2xlSWRMaXN0XCI6W1widXNlcl9yb2xlXCJdfSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoiWC1yYXBpZG8iLCJpc3MiOiIxODY2NDMyMTc5MiIsImV4cCI6MTYwOTA1OTUxNywiaWF0IjoxNjA2NDY3NTE3LCJqdGkiOiIxMjc4MjM2NjAxNzYxMDgzMzk0In0.YA1WgNctqqY3ScdrntLdc8dcC1dnxMk0nKyB0e-mEcM'


/* 获取首页题目分类 */   // 第一
export const reqOnlineExamGetExamType =() => axios ({
    method:'POST',
    url:'/userService/userExam/getExamType'
})

  /* 获取考试信息 */  // 第二
export const reqOnlineExamGetExamInfo =(id) => axios ({
    method:'POST',
    url:'/userService/userExam/getExamInfo',
    data:{
      id:id,
    }
})

//* 请求在线考试 */  // 第三
export const reqOnlineExam =(id,userId) => axios ({
  method:'POST',
  url:'/userService/userExam/getFirstExamTitle',
  data:{
    id:id,
    userId:userId,
  }
})

/* 获取下一题*/   //第四
export const reqNextExam =(answer,checkTitleNum,examPaperId,nextTitleNum,userId) => axios({
  method:'post',
  url:'/userService/userExam/getNextExamTitle',
  data:{
    answer:answer,
    checkTitleNum:checkTitleNum,
    examPaperId:examPaperId,
    nextTitleNum:nextTitleNum,
    userId:userId,
  }
})

/* 提交试卷*/   //第五
export const reqOnlineExamGetExamSubmit =(answer,checkTitleNum,examPaperId,userId) => axios ({
  method:'post',
  url:'/userService/userExam/userExamTitleSubmit',
  data:{
    answer:answer,
    checkTitleNum:checkTitleNum,
    examPaperId:examPaperId,
    userId:userId
  }
})
