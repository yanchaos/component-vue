<template>
  <div>
    <el-popover
      :placement="myPlacement"
      :width="popoverWidth"
      trigger="nanual"
      v-model="visible"
      id="popoverView"
    >
      <el-scrollbar
        ref="e-scrollbar"
        tag="div"
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        class="is-empty"
      >
        <div
          v-if="IconInfo.glyphs && IconInfo.glyphs.length > 0"
          style="display: flex; flex-flow: row wrap"
        >
          <div
            :key="key"
            v-for="(item, key) in IconInfo.glyphs"
            class="table-header-btn-text-size"
            @click="_selectedIcon(item)"
          >
            <div
              :class="[
                'icon-' + item.font_class,
                'table-header-btn-size',
                'iconfont',
              ]"
            ></div>
            <div style="font-size: 15px !important">{{ item.name }}</div>
          </div>
        </div>
        <span v-else class="fas-no-data">暂无可选图标</span>
      </el-scrollbar>
      <el-input
        ref="input"
        class="iconInput"
        v-model="class_value"
        v-bind:value="class_name"
        slot="reference"
        @input="changeIcon"
        @focus="openPopover"
        @blur="visible = false"
      >
        <template slot="prepend"
          ><i :class="prefixIcon" style="max-width: 14px"></i
        ></template>
      </el-input>
    </el-popover>
  </div>
</template>
<script>
import IconInfo from "../../../examples/assets/iconfonts/iconfont.json";

export default {
  name: "IconPicker",
  data() {
    return {
      IconInfo: IconInfo,
      class_value: "",
      myPlacement: "bottom",
      popoverWidth: "600",
      visible: false,
      prefixIcon: "iconfont icon-icon-test13",
      eventTags: false,
    };
  },
  model: {
    prop: "class_name",
    event: "change",
  },
  props: {
    /**
     * class_name图标class名称
     */
    class_name: {
      type: String,
      default: "",
    },
  },
  created() {
    this.initIcon();
  },
  updated() {
    this.initIcon();
  },
  methods: {
    initIcon() {
      this.prefixIcon = "iconfont " + this.class_name;
      this.class_value = this.class_name;
    },
    openPopover() {
      this.visible = true;
      if (!this.eventTags) {
        this.eventTags = true;
        let _this = this;
        document
          .getElementsByClassName("el-popover")[0]
          .addEventListener("mouseleave", function () {
            _this.visible = false;
            document.getElementsByTagName("input").forEach((element) => {
              element.blur();
            });
          });
      }
    },
    _selectedIcon(item) {
      this.class_value = this.IconInfo.css_prefix_text + item.font_class;
      this.prefixIcon = "iconfont " + this.class_value;
      this.visible = false;
      this.$emit("change", this.class_value);
    },
    changeIcon(class_name) {
      /**
       * 改变图标的change事件
       * @type {event}
       * @property {String} class_name 选中的图标class
       */
      this.$emit("change", class_name);
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.table-header-btn-text-size{
    margin-right: 5px;
    display: flex;
    flex-flow:row;
    width: calc(50% - 5px);
    cursor: pointer;
}
.table-header-btn-size{
    font-size: 15px;
    margin: 1px 1px 0 0;
    height: 15px;
    width: 15px;
}
</style>