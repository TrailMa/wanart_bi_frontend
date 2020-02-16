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
  </div>
</template>

<script>
export default {
  name: 'ProjectSelector',
  data() {
    return {
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

      // 通知父组件 项目变更
      let project = this.getProjectById(this.curProjectId)
      this.$emit('selectProject', project)

      // 同步服务器
      if (oldProjectId != value) {
        this.$axios.get('api/manage/user/updateCurProjectId', {
          params: { curProjectId: value }
        })
      }
    },

    getCurProject() {
      return this.getProjectById(this.curProjectId)
    }
  },

  mounted() {
    // init project list
    this.curProjectId = this.$store.state.curProjectId
    this.projectList = this.$store.state.projectList

    if (this.projectList.length == 0) {
      this.projectList.push({ id: 0, desc: '当前无项目权限' })
      return
    }
    if (this.curProjectId == 0) {
      this.curProjectId = this.projectList[0].id
    }

    let project = this.getProjectById(this.curProjectId)
    this.$emit('selectProject', project)
  }
}
</script>

<style scoped>
</style>