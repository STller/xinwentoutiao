<template>
  <el-card>
    <!-- 表头 -->
    <bread-crumb slot="header">
      <!-- 表头的标题 -->
      <template slot="title">我是图文数据</template>
    </bread-crumb>
    <!-- 工作图表 -->
    <div ref="workChart" class="echarts">
      <!-- 获取之前准备好的dom元素 div 对图表进行初始化 -->
    </div>
    <!-- 生活图表 -->
    <div ref="lifeChart" class="echarts"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
// echarts需要需要dom元素 给一个盒子 一般给一个div 给定高宽
export default {
  // 渲染之后执行
  mounted () {
    // init方法是图表的初始化方法
    // 图表实例
    let workChart = echarts.init(this.$refs.workChart)
    let lifeChart = echarts.init(this.$refs.lifeChart)
    // setOption设置图表的样式以及配置
    workChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }
      ]
    })
    lifeChart.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
  }
}
</script>

<style scoped>
.echarts {
  width: 600px;
  height: 400px;
}
</style>
