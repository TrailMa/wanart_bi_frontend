import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    // 日期时间选择快捷方式
    time: {
      pickerHour: {
        start: '00:00',
        step: '01:00',
        end: '23:00'
      },
      pickerDay: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      pickerInterval: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      placeholder: {
        startTime: '开始时间',
        to: '至',
        endTime: '结束时间'
      },
      separationTime: [{
        index: 1,
        label: '天',
        value: 'day'
      }, {
        index: 2,
        label: '小时',
        value: 'hour'
      }, {
        index: 3,
        label: '分钟',
        value: 'minute'
      }]
    },

    projectList: [], //[{id, name, timeCreated, desc}] 前端使用desc作为项目名称
    eventList: new Map(), // key projectId, value eventList[]
    curProjectId: 0, // 当前项目对应的project id
    curProject: undefined
  },

  mutations: {
    setProjectList(state, projectList) {
      state.projectList = projectList
    },

    setCurProjectId(state, index) {
      state.curProjectId = index
      let find = false
      for (let project of state.projectList) {
        if (project.id == state.curProjectId) {
          state.curProject = project
          find = true
          break
        }
      }
      if (!find) {
        curProject = undefined
      }
    },
  },

  actions: {
    setProjectList(context, projectList) {
      context.commit('setProjectList', projectList)
    },

    setCurProjectId(context, id) {
      context.commit('setCurProjectId', id)
    }
  },

  getters: {

  }
})