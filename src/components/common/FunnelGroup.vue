<template>
  <div>
    <funnel-selector
      v-for="(item, index) in funnelList"
      :key="index"
      :eventList="eventList"
      ref="funnelList"
    >
    </funnel-selector>
    <el-button type="primary" icon="el-icon-plus" @click="addFunnel"
      >添加漏斗</el-button
    >
  </div>
</template>

<script>
import FunnelSelector from './FunnelSelector'
export default {
  name: 'FunnelGroup',

  props: {
    eventList: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      funnelList: []
    }
  },

  methods: {
    addFunnel() {
      this.funnelList.push(this.funnelList.length)
    },
    getFunnels() {
      let funnels = []
      if (!this.$refs.funnelList) {
        return funnels
      }
      for (let funnelRef of this.$refs.funnelList) {
        funnels.push(funnelRef.getFunnel())
      }
      return funnels
    }
  },

  components: {
    FunnelSelector
  }
}
</script>

<style scoped>
</style>