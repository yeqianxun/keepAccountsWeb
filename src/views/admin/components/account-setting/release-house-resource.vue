<template>
  <div class="release-house-resource">
    <el-row>
      <el-col class="col-contianer" :span="12">
        <el-form
          ref="houseUploadForm"
          :model="formObj"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="位置：" prop="address">
            <el-cascader
              v-model="formObj.address"
              :options="options"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="布局：" prop="layout">
            <el-select v-model="formObj.layout" placeholder="请选择">
              <el-option
                v-for="item in layoutOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：" prop="house_type">
            <el-select v-model="formObj.house_type" placeholder="请选择">
              <el-option value="0" label="合租"></el-option>
              <el-option value="1" label="整租"></el-option>
              <el-option value="2" label="公寓"></el-option>
            </el-select>
          </el-form-item>
          <template v-for="item in HouseResource">
            <el-form-item
              :key="item.label"
              :label="item.label"
              :prop="item.propName"
            >
              <component
                :disabled="item.disabled"
                :is="item.componentName"
                :type="item.type"
                v-model.number="formObj[item.propName]"
                size="small"
              >
                <template slot="append" v-if="item.slot">{{
                  item.slot
                }}</template>
              </component>
            </el-form-item>
          </template>
          <el-form-item label="年份：" prop="build_date">
            <el-date-picker
              v-model="formObj.build_date"
              type="date"
              placeholder="选择日期"
              format="yyyy"
              value-format="yyyy"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="屋景：" class="house-img">
            <el-upload
              ref="uploadimg"
              class="upload-demo"
              action="/api/house/uploadHouseImg"
              multiple
              :limit="4"
              name="houseimg"
              :auto-upload="false"
              :on-exceed="handleExceed"
              :http-request="httpRequest"
              :with-credentials="true"
              :file-list="fileList"
              :headers="headerObj"
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["houselabels"]),
    options() {
      let data = this.houselabels?.cities?.map((item) => {
        let obj = {
          value: item.cid,
          label: item.cityname,
          children: [],
        };
        obj.children = item?.cityregions?.map((child) => {
          return {
            value: child.regionid,
            label: child.region_name,
          };
        });
        return obj;
      });
      return data || [];
    },
  },
  data() {
    return {
      headerObj: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      fileList: [],
      formData: null,
      layoutOtions: [
        {
          value: "1",
          label: "一居室",
        },
        {
          value: "2",
          label: "二居室",
        },
        {
          value: "3",
          label: "三居室",
        },
        {
          value: "4",
          label: "四居室",
        },
        {
          value: "5",
          label: "四居室以上",
        },
      ],
      formObj: {
        address: "",
        house_square: "",
        layout: "",
        house_price: "",
        house_type: "",
        floor_level: "",
        build_date: "",
        desc: "",
      },
      rules: {
        address: [
          {
            required: true,
            message: "地址必须",
            trigger: "change",
          },
        ],
        layout: [
          {
            required: true,
            message: "布局必须",
            trigger: "blur",
          },
        ],
        house_type: [
          {
            required: true,
            message: "合租类型必须",
            trigger: "blur",
          },
        ],
        house_square: [
          {
            required: true,
            message: "面积必须",
            trigger: "blur",
          },
          { type: "number", message: "面积必须为数字值" },
        ],
        house_price: [
          {
            required: true,
            message: "租金必须",
            trigger: "blur",
          },
          { type: "number", message: "租金必须为数字值" },
        ],
        floor_level: [
          {
            required: true,
            message: "楼层必须",
            trigger: "blur",
          },
          { type: "number", message: "楼层必须为数字值" },
        ],
        build_date: [
          {
            type: "string",
            required: true,
            message: "修建年份必须",
            trigger: "change",
          },
        ],
        desc: [
          {
            type: "string",
            required: true,
            message: "标题",
            trigger: "change",
          },
        ],
      },
      HouseResource: [
        {
          label: "标题：",
          componentName: "el-input",
          propName: "desc",
          disabled: false,
          // slot: "层",
        },
        {
          label: "面积：",
          componentName: "el-input",
          propName: "house_square",
          disabled: false,
          slot: "㎡",
        },
        {
          label: "价格：",
          componentName: "el-input",
          propName: "house_price",
          disabled: false,
          slot: "¥",
        },
        {
          label: "楼层：",
          componentName: "el-input",
          propName: "floor_level",
          disabled: false,
          slot: "层",
        },
      ],
    };
  },
  methods: {
    //覆盖原始请求,解决多文件上传问题
    httpRequest(file) {
      this.formData.append("files", file.file);
    },
    submitForm() {
      this.formData = new FormData();
      this.$refs.uploadimg.submit(); //自动调用httpRequest
      let city = this.houselabels?.cities?.find(
        (item) => item.cid == this.formObj.address[0]
      );
      let region = city?.cityregions?.find(
        (region) => region.regionid == this.formObj.address[1]
      );
      this.$refs.houseUploadForm.validate((valid) => {
        if (valid) {
          Object.keys(this.formObj).forEach((prop) => {
            if (prop !== "address") {
              this.formData.append(prop, this.formObj[prop]);
            } else {
              this.formData.append(
                "address",
                city.cityname + region.region_name
              );
            }
          });
          this.$XHR
            .uploadHouse(this.formData, {
              "Content-Type": "multipart/form-data; charset=utf-8",
            })
            .then(() => {
              this.$refs.houseUploadForm.resetFields();
              this.formData = null;
              this.fileList = [];
            });
        }
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.release-house-resource {
  margin: 0 auto;
  padding-top: 60px;
}
</style>
<style lang="scss">
.release-house-resource {
  .el-cascader,
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .col-contianer {
    margin: 0 180px;
  }
  .el-upload-list {
    margin-left: 100px;
  }
  .el-upload {
    float: left;
  }
}
</style>