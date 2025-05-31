<template>
  <div class="baseline-page">
    <section class="search-section">
      <div class="card container">
        <div class="search-container">
          <div class="search-form">
            <el-select
              v-model="sapiens"
              class="organism-select"
              size="large"
              placeholder="Select organism"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            
            <el-input
              v-model="input"
              placeholder="Enter protein name"
              size="large"
              clearable
              @keyup.enter.native="onEnter"
              class="protein-input"
              :suffix-icon="Search"
            />
          </div>
          
          <div class="type-selector">
            <span class="selector-label">Select type:</span>
            <div class="selector-options">
              <el-check-tag
                :checked="checkedTissue"
                @change="onChangeTissue"
                class="type-tag tissue-tag"
              >
                Tissue
              </el-check-tag>
              <el-check-tag
                :checked="checkedCellLine"
                @change="onChangeCellLine"
                class="type-tag cell-tag"
              >
                Cell Line
              </el-check-tag>
            </div>
          </div>
          
          <div class="examples-container">
            <el-text class="examples-text">
              Examples:
              <span @click="onSearch('P50851')" class="example-link">P50851</span>,
              <span @click="onSearch('Q96HS1')" class="example-link">Q96HS1</span>,
              <span @click="onSearch('Q14114')" class="example-link">Q14114</span>
              &nbsp;&nbsp;Help: <a href="https://github.com/bigbio/ibaqpy" class="help-link">iBAQLog</a>
            </el-text>
          </div>
        </div>
      </div>
    </section>
    
    <section class="results-section">
      <div
        class="results-container container"
        v-loading="loading"
        element-loading-text="Loading data..."
      >
        <router-view
          :key="key"
          @changeLoading="changeLoading"
        ></router-view>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();
const loading = ref(false);

// sapiens
const sapiens = ref("");
// select_menus
const options = [
  {
    value: "Homo sapiens",
    label: "Homo sapiens",
  },
];
const checkedTissue = ref(true);
const checkedCellLine = ref(false);
const key = computed(() => router.currentRoute.value.name == 'tissues' ? 'tissues' : 'cellline');
const input = ref("");

const onEnter = () => {
  onSearch(input.value);
};

// change tag status
const onChangeTissue = (status) => {
  checkedTissue.value = status;
  checkedCellLine.value = !status;
  if (input.value) {
    onSearch(input.value);
  }
};

const onChangeCellLine = (status) => {
  checkedCellLine.value = status;
  checkedTissue.value = !status;
  if (input.value) {
    onSearch(input.value);
  }
};

const onSearch = (val) => {
  if (!val) {
    return;
  }
  input.value = val;
  if (checkedTissue.value) {
    router.push({ path: "/baseline/tissues", query: { protein: [val] } });  
  } else {
    router.push({ path: "/baseline/cellline", query: { protein: [val] } }); 
  }
};

const changeLoading = () => {
  loading.value = !loading.value;
};
</script>

<style lang="scss" scoped>
.baseline-page {
  padding: $spacing-md 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  margin-top: 60px;
}

.container {
  width: 100%;
  margin: 0 auto;
}

.search-section,
.results-section {
  margin: 0;
  width: 100%;
}

.search-section {
  margin-bottom: $spacing-xl;
}

.results-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-container {
  padding: $spacing-lg;
}

.search-form {
  display: flex;
  justify-content: center;
  margin-bottom: $spacing-lg;
  gap: $spacing-sm;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }
}

.organism-select {
  width: 140px;
  
  :deep(.el-input__wrapper) {
    border-right-width: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid $border-color;
    box-shadow: none;
  }
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
    
    :deep(.el-input__wrapper) {
      border-radius: $border-radius;
      border-width: 1px;
    }
  }
}

.protein-input {
  width: 400px;
  
  :deep(.el-input__wrapper) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 0;
    border: 1px solid $border-color;
    box-shadow: none;
  }
  
  @media (max-width: $breakpoint-md) {
    width: 300px;
  }
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
    
    :deep(.el-input__wrapper) {
      border-radius: $border-radius;
      border-width: 1px;
    }
  }
}

.type-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $spacing-md 0;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-xs;
  }
}

.selector-label {
  margin-right: $spacing-lg;
  font-size: $font-size-base;
  font-weight: 600;
  color: $text-color;
}

.selector-options {
  display: flex;
  gap: $spacing-sm;
}

.type-tag {
  font-size: $font-size-small;
  border-radius: $border-radius;
  padding: $spacing-xs $spacing-sm;
}

.examples-container {
  display: flex;
  justify-content: center;
  margin-top: $spacing-md;
}

.examples-text {
  font-size: $font-size-base;
}

.example-link {
  color: $primary-color;
  cursor: pointer;
  transition: $transition-base;
  
  &:hover {
    color: darken($primary-color, 10%);
    text-decoration: underline;
  }
}

.help-link {
  color: $link-color;
  text-decoration: none;
  transition: $transition-base;
  
  &:hover {
    color: darken($link-color, 10%);
    text-decoration: underline;
  }
}

.results-container {
  background-color: $white;
  border-radius: $border-radius-lg;
  flex: 1;
  padding: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.overview-table {
  width: 100%;
  margin-top: $spacing-lg;

  th, td {
    padding: $spacing-sm;
    border: 1px solid $border-color-base;
  }
}
</style>
