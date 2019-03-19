<template>
    <div class="data-table">
        <el-tabs v-model="tabName" @tab-click="tabHandleClick">
            <el-button
                    v-if="hasPer('cms:schoolNodes:create')"
                    type="primary"
                    icon="el-icon-plus"
                    @click="dialogVisible = true"
                    size="mini"
                >新增作息</el-button>

            <el-tab-pane label="夏时令" name='SD01'>
                
                <el-table
                    :data = "tableData"
                    border
                    style="width:100%"
                >
                    <el-table-column label="节次" prop="nodeName"></el-table-column>
                    <el-table-column label="开始时间" prop="startTime"></el-table-column>
                    <el-table-column label="结束时间" prop="endTime"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="hasPer('cms:schoolNodes:delete')"
                                @click="deleteOne(scope.row)"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="冬时令" name="SD02">
                 <el-table
                    :data = "tableData"
                    border
                    style="width:100%"
                >
                    <el-table-column label="节次" prop="nodeName"></el-table-column>
                    <el-table-column label="开始时间" prop="startTime"></el-table-column>
                    <el-table-column label="结束时间" prop="endTime"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="hasPer('cms:schoolNodes:delete')"
                                @click="deleteOne(scope.row)"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-dialog
                title="新增作息"
                :visible.sync="dialogVisible"
                width="500px"
                @closed="handleClosed"
            >
                <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
                    <el-form-item label="上学时间" prop="startTime">
                        <el-time-picker v-model="formData.startTime" value-format="HH:mm"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="放学时间" prop="endTime">
                        <el-time-picker v-model="formData.endTime" value-format="HH:mm"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="上课时间" prop="classTime">
                        <el-input v-model="formData.classTime"></el-input>
                    </el-form-item>
                    <el-form-item label="休息时间" prop="resetTime">
                        <el-input v-model="formData.resetTime"></el-input>
                    </el-form-item>
                    <el-form-item label="大课间时间" prop="secTime">
                        <el-input v-model="formData.secTime"></el-input>
                    </el-form-item>
                    <el-form-item label="大课间第几节" prop="secNum">
                        <el-input v-model="formData.secNum"></el-input>
                    </el-form-item>                    
                    <el-form-item label="下午上课时间" prop="rTime">
                        <el-time-picker v-model="formData.rTime" value-format="HH:mm"></el-time-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">添加作息</el-button>
                        <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-tabs>
    </div>
</template>

<script>
import { SchoolNodesList,SchoolNodesAdd,SchoolNodesDelete } from "@/api/v2";
import { mapGetters } from 'vuex';
export default {
    name:'rest',
    data(){
        return{
            dialogVisible:false,
            tabName:'SD01',    // 冬时令:SD02   夏时令:SD01
            tableData:[],
            formData:{
                startTime:'',
                endTime:'',
                classTime:'',
                resetTime:'',
                secTime:'',
                secNum:'',
                rTime:''
            },
            rules:{
                startTime: [{required:true,message: "不能为空", trigger: "blur"}],
                endTime:[{required:true,message: "不能为空", trigger: "blur"}],
                classTime:[{required:true,message: "不能为空", trigger: "blur"}],
                resetTime:[{required:true,message: "不能为空", trigger: "blur"}],
                secTime:[{required:true,message: "不能为空", trigger: "blur"}],
                secNum:[{required:true,message: "不能为空", trigger: "blur"}],
                rTime:[{required:true,message: "不能为空", trigger: "blur"}]
            }
        }
    },
    computed:{
        ...mapGetters(['organId'])        
    },
    created(){
        this.getSchoolNodesList({schoolId:this.organId,seasonCode:this.tabName})
    },
    methods:{
        // 切换时令
        tabHandleClick(tab,event){
            console.log(tab,event)
            this.tabName = tab.name
        },

        // 获取列表
        getSchoolNodesList(data){
            SchoolNodesList(data).then(res=>{
                this.tableData = res.data? res.data.rows:[];
                
            })
        },
        // 添加
        submitForm(formName){
            console.log(this.formData)
            var app = {
                timeToSec: function (val) {
                    var hour = val.split(':')[0],
                        min = val.split(':')[1];
                    return Number(hour * 60) + Number(min)
                },
                zeroTime:function(val) {
                    if (val < 10) {
                        return '0' + val
                    }
                    return val
                },
                timeString:function(val) {
                    var hour = this.zeroTime(parseInt(val / 60))
                    var min = this.zeroTime(val % 60);
                    return hour + ':' + min
                },
                timeFun: function (val) {
                    console.log(val)
                    var dataB = {}
                    if (val instanceof Object) {
                        for (i in val) {
                            dataB[i] = val[i]
                        }
                    }
                    var start = this.timeToSec(dataB.startTime);
                    var end = this.timeToSec(dataB.endTime);
                    var endP = this.timeToSec(dataB.rTime);
                    var arrS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
                    var Am = ['上午', '下午'];
                    var Ftime = this.timeToSec('12:00:00');
                    var arr = [], i = 0;
                    while (start < end) {
                        var time = start;
                        if (time <= Ftime) {
                            console.log('上午')
                            if (i != (dataB.secNum - 1)) {
                                start += (dataB.classTime + dataB.resetTime);
                                if ((start - dataB.resetTime) < Ftime) {

                                    arr.push({
                                        "endTime": this.timeString(start - dataB.resetTime),
                                        "nodeName": "上午第"+arrS[i]+"节",
                                        "startTime": this.timeString(time),
                                        "status": 1
                                    })
                                }
                            } else {
                                start += (dataB.classTime + dataB.secTime);

                                arr.push({
                                    "endTime": this.timeString(start - dataB.secTime),
                                    "nodeName": "上午第"+arrS[i]+"节",
                                    "startTime": this.timeString(time),
                                    "status": 1
                                })

                            }
                        } else {
                            console.log('下午')
                            if (start < endP) {
                                start = endP;
                                i = 0;
                            }
                            var time2 = start;
                            start += (dataB.classTime + dataB.resetTime);

                            arr.push({
                                "endTime": this.timeString(start - dataB.resetTime),
                                "nodeName": "下午第"+arrS[i]+"节",
                                "startTime": this.timeString(time2),
                                "status": 1
                            })
                        }
                        // 防止陷入死循环
                        if (i > 20) {
                            break;
                        }
                        i++;
                    }
                    return arr

                }
            }

            let t = app.timeFun({
                startTime:this.formData.startTime,//上学时间
                endTime: this.formData.endTime,//放学时间
                rTime:this.formData.rTime, // 下午上课时间
                classTime:Number( this.formData.classTime),// 每节课上课时间
                resetTime: Number(this.formData.resetTime),// 课间休息时间
                secTime: Number(this.formData.secTime), // 大课间时间
                secNum: Number(this.formData.secNum), // 大课间第几节
            });

        console.log(t)
        let data = {list:t,seasonCode:this.tabName,schoolId:this.organId}
            this.$refs[formName].validate(valid => {
                if (valid) {
                // 新加
                SchoolNodesAdd(data).then(res => {
                    this.$message({
                        type: res.code == 1 ? "success" : "error",
                        message: res.message
                    });
                    this.dialogVisible = false;
                    this.getSchoolNodesList({schoolId:this.organId,seasonCode:this.tabName});
                    this.resetForm(formName);
                });
                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },

        // 删除
        deleteOne(event){
            console.log(event)
            let data = {ids:event.id}
            this.$msgbox({
                title: "删除操作",
                message: "确定要删除吗?",
                callback: e => {
                    if (e == "confirm") {
                        SchoolNodesDelete(data).then(res => {
                            console.log(res)
                            this.$message({
                                type: res.code == 1 ? "success" : "error",
                                message: res.message,
                                onClose: () => {
                                this.getSchoolNodesList({schoolId:this.organId,seasonCode:this.tabName});
                                }
                            });
                        });
                    }
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            
        },
        // 关闭弹窗
        handleClosed(){
            this.dialogVisible = false;
            this.getSchoolNodesList({schoolId:this.organId,seasonCode:this.tabName})
        }
    },
    watch:{
        tabName(res){
            this.getSchoolNodesList({schoolId:this.organId,seasonCode:res})
        }
    }
}
</script>

<style>
    input.el-input__inner{
        width: 220px;
    }
</style>


