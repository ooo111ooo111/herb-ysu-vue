//导入request.js请求工具（调用后台接口需要发送异步请求
import request from "@/utils/request";

export const userRegisterService = (registerData) => {
  //借助于URLSearchParams完成传递，否则下面传递的参数是json格式
  const params = new URLSearchParams();
  //遍历registerData得到里面的键值对，再封装到params里
  for (const key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}

export const userLoginService = (loginData) => {
  const params = new URLSearchParams();
  for (const key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

export const userInfoService = () => {
  return request.get('/user/userInfo')
}

export const userInfoUpdateService = (userInfoData) => {
  return request.put('/user/update', userInfoData)
}

export const userAvatarUpdateService = (avatarUrl) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('avatarUrl', avatarUrl)
  return request.patch('/user/updateAvatar', urlSearchParams)
   //参数是query类型的，可以直接拼接到后面也可以借助URLSearchParams来完成
}

export const userPwdUpdateService = (pwdData) => {
  return request.patch('/user/updatePwd', pwdData)
}

export const userListService = (params) => {
  return request.get('/user/list',{params})
}

export const getUserByIdService = (id) => {
  return request.get('/user/getUserById?id=' + id)
}

export const userDeleteService = (id) => {
  return request.delete('/user?id=' + id)
}

