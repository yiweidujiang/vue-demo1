<template>
    <div class="data-table">
        <div class="btn">
            <el-button type="warning" @click="DownTemplate">下载模板</el-button>
            <!-- <el-button type="primary">上传课表</el-button> -->
            <!-- <el-button type="success">开始上传</el-button> -->

            <el-upload
                ref="upload1"
                action="http://192.168.17.216:10000/v2/manage/schoolSchedule/upload"
                :auto-upload="false"
                :data="{schoolId:organId}"
            >
                <el-button slot="trigger"  type="primary">选取文件</el-button>   
                <el-button style="margin-left:10px;" type="success" @click="submitUpload">开始上传</el-button> 
            </el-upload>
            <div>
                <v-select ref="selectA"></v-select>
            </div>
            <el-button @click="switchTimeTable">切换课表</el-button>
            
        </div>


       

        <div class="table" v-if="tableList.length > 0">
            <div class="row ta left">
                <div class="col"></div>
                <div class="col" v-for="(item,index) in list1" :key="index">{{item.nodeName}} ({{item.startTime}} -- {{item.endTime}})</div>
            </div>
            <div class="ta">
                <div class="th">
                    <div class="col">周一</div>
                    <div class="col">周二</div>
                    <div class="col">周三</div>
                    <div class="col">周四</div>
                    <div class="col">周五</div>
                </div>
                
                <div class="row">
                    <div class="col" v-for="(item,index) in list1" :key="index">{{item.subjectName}}</div>
                </div>
                <div class="row">
                    <div class="col" v-for="(item,index) in list2" :key="index">{{item.subjectName}}</div>
                </div>
                <div class="row">
                    <div class="col" v-for="(item,index) in list3" :key="index">{{item.subjectName}}</div>
                </div>
                <div class="row">
                    <div class="col" v-for="(item,index) in list4" :key="index">{{item.subjectName}}</div>
                </div>
                <div class="row">
                    <div class="col" v-for="(item,index) in list5" :key="index">{{item.subjectName}}</div>
                </div>
            </div>
            
        </div>


        <!-- <div>
            <el-table>
                <el-table-column label="课表" width="100%">
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <span v-text="scope.row.nodeName"></span>
                            <span> (</span>
                            <span v-text="scope.row.startTime"></span>
                            <span> --- </span>
                            <span v-text="scope-row.endTime"></span>
                            <span>)</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="周一" prop=""></el-table-column>
                    <el-table-column label="周二" prop=""></el-table-column>
                    <el-table-column label="周三" prop=""></el-table-column>
                    <el-table-column label="周四" prop=""></el-table-column>
                    <el-table-column label="周五" prop=""></el-table-column>
                </el-table-column>
            </el-table>
        </div> -->
    </div>
</template>

<script>
import select from "@/components/select";
import { SchoolScheduleList,SchoolScheduleExport,SchoolScheduleUpload } from "@/api/v2"
import { mapGetters } from 'vuex'
export default {
    name:'timeTable',
    data(){
        return {
           tableList:[],
           list1:[],
           list2:[],
           list3:[],
           list4:[],
           list5:[]
        }
    },
    computed:{
        ...mapGetters(['organId'])
    },
    components:{
        'v-select':select
    },
    created(){
        // this.qqq()

        // this.getSchoolScheduleList({schoolId:this.organId})

    },
    methods:{
        switchTimeTable(){
            console.log(111)
            
            if(this.$refs['selectA'].value2){
                this.getSchoolScheduleList({schoolId:this.organId,classId:this.$refs['selectA'].value2})
            }
            
        },
        // 课程列表
        getSchoolScheduleList(data){
            console.log(this.$refs['selectA'])
            SchoolScheduleList(data).then(res=>{                
                this.tableList = res.data?res.data.rows:[]
                console.log(this.tableList)
                
                this.list1 = this.tableList.slice(0,7)
                this.list2 = this.tableList.slice(7,14)
                this.list3 = this.tableList.slice(14,21)
                this.list4 = this.tableList.slice(21,28)
                this.list5 = this.tableList.slice(28,35)
                console.log(this.list)
            })
        },

        // 下载模板
        DownTemplate(){
            console.log(this.organId)
            let data = {schoolId:this.organId}
            SchoolScheduleExport(data).then(res=>{
                console.log(res)
                if(Number(res.code) === 1){
                    console.log(res)
                    this.downloadFile(res.data)
                }
            })
        },
        downloadFile(url) {
        
            try{
                document.getElementById("ifile").src=url;
            }catch(e){
                console.log(e)
            }
        },

        // 上传课表
        // 开始上传
        submitUpload() {
            this.$refs.upload1.submit();
        },

    },
    watch:{
        
    }
}
</script>


<style>
    .btn{
        display: flex;
        width: 1100px;
        justify-content: space-between;
    }
    .table{
        width: 1200px;
        margin: 60px 60px 30px 100px;
    }
    .table .row{
        display: inline-block
    }
    .table .col{
        width: 150px;
        height: 60px;
        border: 1px solid #333;
        margin-left: -7px;
        text-align: center;
        line-height: 60px;
    }
    .th>div{
        display: inline-block;
    }
    .ta{
        display: inline-block;
    }
    
    .table .left .col{
        width: 220px;
    }
</style>
