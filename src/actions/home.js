import instance from 'utils/instance'

//这个叫做action，用于更新reduer中的state
export const sync = () => ({
  type: 'SET_SYNC',
  sync: 'sync ok'
})

const async = response => ({
  type: 'SET_ASYNC',
  async: response
})


//获取服务器的参数，并且返回一个异步的dispatch，dispatch的对象是自己定义的action
export const getAsync = () => async dispatch => {
  try {
    const response = await instance.get('/api/demo')

    await dispatch(async('async ok'))
    return response
  } catch (error) {
    console.log('error: ', error)
  }
}

//分隔符====================================================================================

