<template>
  <div class="table-header-btn-box">
    <template v-for="(item, key) in operate">
      <div :id="key"
        :key="key"
        @click="selectItem(item.event, item.disabled)"
        class="table-header-btn-text-size"
      >
        <div :class="[item.icon, 'table-header-btn-size', 'iconfont', {'is-disabled': item.disabled}]" ></div>
        <div :class="[ {'is-disabled': item.disabled}]" style="font-size:20x">{{item.remark}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "TableHeaderButton",
  data() {
    return {};
  },
  props: {
    /**
     *  按钮数组
     */
    operate: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    /**
     * 选中颜色后的处理事件
     * @param {Event} event 绑定事件名称
     * @param {object | string} disabled 响应事件的返回值
     */
    selectItem(event, disabled) {
      if (disabled) {
        return;
      }
      /**
       * 响应组件的事件名
       * @event event 
       * @param {object | string} disabled 响应事件的返回值
       */
      this.$emit(event, disabled);
    }
  }
};
</script>

<style lang="scss" scoped>
.is-disabled {
  opacity: 0.8;
  cursor: not-allowed;
  color: #a7a5a5;
}
.table-header-btn-box {
    display: flex;
}

.table-header-btn-text-size {
    margin-right: 5px;
    display: flex;
    flex-flow: row;
}

.table-header-btn-size {
    font-size: 19px;
    margin: 1px 1px 0 0;
}
</style>