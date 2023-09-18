<template>
  <div class="dropdown-container">
    <button @click="toggleDropdown">Toggle Dropdown</button>
    <transition name="fade">
      <div v-if="isDropdownOpen" class="dropdown-wrapper" :class="dropdownPosition" ref="dropdownWrapper">
        <ul class="dropdown-list">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            @click="selectItem(index)"
            :class="{ selected: selectedIndex === index }"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      dropdownPosition: 'down',
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        // 添加更多下拉选项
      ],
      selectedIndex: -1,
    };
  },
  created() {
    // 在组件创建时初始化选中项
    this.selectDefaultItem();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.calculateDropdownPosition();
      }
    },
    calculateDropdownPosition() {
      const dropdownWrapper = this.$refs.dropdownWrapper;
      if (dropdownWrapper) {
        const dropdownRect = dropdownWrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (dropdownRect.bottom > windowHeight) {
          this.dropdownPosition = 'up';
        } else {
          this.dropdownPosition = 'down';
        }
      }
    },
    selectItem(index) {
      this.selectedIndex = index;
      this.isDropdownOpen = false;
    },
    selectDefaultItem() {
      if (this.items.length > 0) {
        this.selectedIndex = 0; // 默认选中第一项
      } else {
        // 如果没有选项，则显示"请选择"
        this.items.push({ id: 0, text: '请选择' });
        this.selectedIndex = 0;
      }
    },
  },
};
</script>

<style>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-wrapper {
  position: absolute;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.selected {
  background-color: #e0e0e0;
}
</style>
