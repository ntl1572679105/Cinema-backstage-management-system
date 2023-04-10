<template>
  <div class="item">
    <img :src="avatar" width="100px" :title="name">
    <div>{{ name }}</div>
    <i class="el-icon-circle-close" @click="clickIcon"></i>
  </div>
</template>

<script>
  export default {
    // 通过props声明两个自定义属性 name/avatar
    // props: ['name', 'avatar']
    props: {   
      name: {
        type: String,    // name的类型为String, 不传String报错
        required: true   // name必填, 不传name参数就报错
      },
      avatar: {
        type: String,    // avatar的类型为String, 不传String报错
        required: true   // avatar必填, 不传avatar参数就报错
      }
    },

    methods: {
      clickIcon () { // 只要点了叉子, 就会触发该事件
        // 此处直接抛出自定义事件, 交给父组件来做后续业务
        this.$emit('delete', {name:'zs', age:35, id:11})
      }
    },
  }
</script>

<style lang="scss" scoped>
.item {
  width: 100px;
  height: 160px;
  text-align: center;
  font-size: 0.9em;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;

  i {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 20px;
    background-color: #fff;
    border-radius: 50%;
    display: none;
  }

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.item:hover {
  opacity: 0.8;
}

.item:hover i {
  display: block;
  opacity: 1;
}

</style>