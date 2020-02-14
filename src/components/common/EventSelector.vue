<template>
  <div>
    <el-select
      v-model="curProjectId"
      placeholder="选择项目"
      @change="onSelectProject"
    >
      <el-option
        v-for="item in projectList"
        :key="item.id"
        :label="item.desc"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="curEventName"
      placeholder="选择事件"
      @change="onSelectEvent"
    >
      <el-option
        v-for="(item, index) in eventList"
        :key="index"
        :label="item"
        :value="index"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ProjectSelector',
  data() {
    return {
      curEventName: '',
      eventList: [],
      curProjectId: 0,
      projectList: []
    }
  },

  methods: {
    getProjectById(projectId) {
      for (let project of this.$store.state.projectList) {
        if (project.id == projectId) {
          return project
        }
      }
      return undefined
    },

    onSelectProject(value) {
      let oldProjectId = this.$store.state.curProjectId
      this.curProjectId = value
      this.$store.dispatch('setCurProjectId', value)

      this.queryEventList(this.curProjectId)

      if (oldProjectId != 0 && oldProjectId != value) {
        this.$axios.get('api/manage/user/updateCurProjectId', {
          params: { curProjectId: value }
        })
      }
    },
    onSelectEvent(value) {
      // value 为 eventList的index
      this.curEventName = this.eventList[value]
    },

    async queryEventList(projectId) {
      let project = this.getProjectById(this.curProjectId)
      if (project) {
        let result = await this.$axios.get('api/event/queryAll', {
          params: { project: project.name }
        })
        if (result.result == 1) {
          this.eventList = result.eventList
        } else {
          this.$message(result.msg)
        }
      }
    }
  },

  created() {
    // init project list
    this.curProjectId = this.$store.state.curProjectId
    this.projectList = this.$store.state.projectList

    if (this.projectList.length == 0) {
      this.projectList.push({ id: 0, desc: '当前无项目权限' })
      return
    }
    if (this.curProjectId == 0) {
      this.curProjectId = this.projectList[0].id
      this.queryEventList(this.curProjectId)
    }
  }
}
</script>

<style scoped>
</style>