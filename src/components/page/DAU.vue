<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> DAU
                </el-breadcrumb-item>
                <el-breadcrumb-item>活跃用户(accountId)</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container compute-box">
            <p>计算条件</p>
            <el-divider></el-divider>
            <div class="base-condition">
                <el-select v-model="distinct" placeholder="分析对象" class="handle-select mr10">
                    <el-option key="1" label="accountId" value="accountId"></el-option>
                    <el-option key="2" label="uid" value="uid"></el-option>
                </el-select>
                <el-date-picker
                    v-model="time_data"
                    type="datetimerange"
                    :picker-options="words.time.pickerInterval"
                    :range-separator="words.time.placeholder.to"
                    :start-placeholder="words.time.placeholder.startTime"
                    :end-placeholder="words.time.placeholder.endTime"
                    :default-time="['00:00:00', '23:59:59']"
                    align="right"
                    class="time mr10"
                    value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-select v-model="separationTime" placeholder="间隔颗粒度" class="handle-select mr10">
                    <el-option 
                        v-for="item in words.time.separationTime" 
                        :key="item.index" 
                        :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="group" placeholder="分组方式" class="handle-select mr10">
                    <el-option key="1" label="无" value=" "></el-option>
                    <el-option key="2" label="serverId" value="serverId"></el-option>
                    <el-option key="3" label="channel" value="channel"></el-option>
                </el-select>
                <el-button type="success" icon="el-icon-zoom-in" @click="handleAddCondition()">添加计算条件</el-button>
            </div>
            <div class="more-condition">
                <div class="mt15" v-for="(item,index) in counter" :key="index">
                    <el-select v-model="counter[index].compute_obj" placeholder="选择计算对象" class="handle-select mc">
                        <el-option key="1" label="serverId" value="serverId"></el-option>
                        <el-option key="2" label="channel" value="channel"></el-option>
                    </el-select>
                    <el-select v-model="counter[index].operator" placeholder="选择运算符" class="handle-select mc">
                        <el-option key="1" label="等于" value="="></el-option>
                        <el-option key="2" label="不等于" value="<>"></el-option>
                    </el-select>
                    <el-input v-model="counter[index].detail_value" placeholder="输入数值" class="handle-input mr10"></el-input>
                    <el-button class="btn-delete" type="text" icon="el-icon-delete" @click="handleDelete(index)">删除</el-button>
                </div>
                <div class="mt15" v-if="counter.length > 1">
                    <el-select v-model="logical_operator" placeholder="请选择附加条件逻辑运算关系" class="handle-select logical">
                        <el-option key="1" label="且" value="and"></el-option>
                        <el-option key="2" label="或" value="or"></el-option>
                    </el-select>
                </div>
            </div>
            <el-button class="btn-compute mt15" type="primary" icon="el-icon-search" @click="handleCompute()">开始计算</el-button>
        </div>
        <div class="container chart-box">
            <p>图形分析</p>
            <el-divider></el-divider>
            <schart class="schart" canvasId="line" :options="options2"></schart>
        </div>
        <div class="container table-box">
            <p>详细数据</p>
            <el-divider></el-divider>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="时间"></el-table-column>
                <el-table-column prop="address" label="活跃用户"></el-table-column>
                <el-table-column prop="date" label="serverId"></el-table-column>
                <el-table-column prop="address" label="channel"></el-table-column>
                <el-table-column prop="date" label="uid/accountId"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange()"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import Schart from 'vue-schart';
export default {
    name: 'active-user',
    beforeCreate () {
        this.words = this.$store.state;
    },
    components: {
        Schart
    },
    data() {
        return {
            distinct: '',
            time_data: '',
            separationTime: '',
            group: '',
            counter: [],
            logical_operator: '',
            condition: '',
            options2: {
                type: 'line',
                /* title: {
                    text: '最近几个月各品类销售趋势图'
                }, */
                bgColor: '#fbfbfb',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                datasets: [
                    /* {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    }, */
                    {
                        label: '食品',
                        data: [10, 2, 3, 4, 5, 10, 15, 50, 9, 10, 11, 500, 200, 50, 15, 16, 535, 400, 1156, 2315, 1865, 1524, 869, 452]
                    }
                ]
            },
            tableData: [],
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0
        };
    },
    methods: {
        test () {
            console.log(this.selceted_group)
        },
        // 添加计算条件
        handleAddCondition () {
            this.counter.push({});
        },

        // 删除计算条件
        handleDelete (index) {
            this.counter.splice(index,1);
        },

        // 获取分析数据
        handleCompute () {
            this.condition = "";
            for (let index = 0; index < this.counter.length; index++) {
                this.condition += this.counter[index].compute_obj + this.counter[index].operator + this.counter[index].detail_value + " " + this.logical_operator + " ";
            }
            if (this.logical_operator != "") {
                this.condition = this.condition.substring(0,this.condition.lastIndexOf(this.logical_operator));
            }
            let params = {
                distinct: this.distinct,
                condition: this.condition.replace(/(\s*$)/g, "") || "true",
                group: this.group.replace(" ",""),
                separationTime: this.separationTime,
                startTime: this.time_data[0],
                endTime: this.time_data[1],
                project: 'mxzm'
            }
            console.log(params)
            if (params.distinct === "" || params.separationTime === "" || params.startTime === "" || params.endTime === "") {
                this.$message.error('有空白项，请检查补充完整！');
            } else {
                this.$axios({
                    url: '/api/data/dau',
                    methods: 'get',
                    params: params
                }).then((res)=> {
                    console.log(res)
                    // this.tableData = res.data;
                }).catch(function (err) {
                    console.log('fetch faild:'+err);
                });
            }
        },
        
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.container {
    margin-bottom: 20px;
}

.mt15 {
    margin-top: 15px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.mr10 {
    margin-right: 10px;
}

.mc {
    margin-right: 10px;
    width: 210px;
}

.logical {
    width: 740px;
}

.btn-delete {
    color: #ff0000;
    text-decoration: underline;
}

.btn-compute {
    width: 100%;
}

.schart {
    height: 400px;
}

.table {
    width: 100%;
    font-size: 14px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

</style>
