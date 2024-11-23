<template>
    <input :value="modelValue" @input="updateValue" :placeholder="placeholder" />
</template>
  
<script>
  export default {
    name: "InputField",
    props: ["modelValue", "placeholder"],
    emits: ["update:modelValue"],
    methods: {
      updateValue(event) {
        this.$emit("update:modelValue", event.target.value);
      },
    },
  };
</script>
  
<style scoped>
  *{
    box-sizing: border-box;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 10px;
    width: 75%;
  }
  input:focus {
    border-color: #FFA500;
    outline: none;
  }
</style>
  
  
  