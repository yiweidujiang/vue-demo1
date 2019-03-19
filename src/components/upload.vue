<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://192.168.17.82:9090/index/fileUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :data="uploadParams"
      list-type="picture"
      :multiple="allow"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.allow)
  },
  data() {
    return {
      fileList: [],
      uploadParams: {
        name: "",
        type: "",
        lastModifiedDate: "",
        size: "",
        uid: ""
      },
      DATA: []
    };
  },
  props: {
    model: String,
    allow: Boolean
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(res) {
      let file = res.name + "" + res.size + "" + res.type;
      let md5 = this.$md5(file);
      const $this = this;
      $this.uploadParams.id = "text01";
      $this.uploadParams.name = res.name;
      $this.uploadParams.type = res.type;
      $this.uploadParams.lastModifiedDate = res.lastModifiedDate;
      $this.uploadParams.size = res.size;
      $this.uploadParams.uid = res.uid;
      $this.uploadParams.md5 = md5;
      // this.$http({
      //   url: "http://192.168.17.82:9090/index/checkFileMd5",
      //   method: "post",
      //   params: {
      //     uid: res.uid,
      //     md5
      //   }
      // }).then(result => {
      //   if (result.status.value != 100) {
      //   } else {
      //     // 文件已经上传过
      //     let data = result.data ? JSON.parse(result.data) : null;
      //     let arr = [];
      //     arr.push({
      //       name: data.fileName,
      //       url: "http://192.168.17.82/" + data.url
      //     });
      //     console.log(arr);
      //     this.fileList = arr;
      //   }
      // });
    },
    uploadSuccess(res) {
      let data = res.data ? res.data : null;
      this.$emit("successUpload", data.url);
      this.DATA.push(data);
      if (this.allow) {
      } else {
      }
    }
  },
  watch: {
    model: function(res) {
      if (res == null||res==""||res.length==0) {
        this.fileList = [];
      } else {
        let arr = [];
        arr.push({
          url: "http://192.168.17.82/" + res
        });
        this.fileList = arr;
      }
    }
  }
};
</script>