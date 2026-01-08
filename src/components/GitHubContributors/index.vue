<template>
  <div class="github-contributors-component">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>
    
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <el-button type="primary" @click="fetchContributors">Retry</el-button>
    </div>
    
    <div v-else class="contributors-grid">
      <div v-for="contributor in contributors" :key="contributor.id" class="contributor-card">
        <a :href="contributor.html_url" target="_blank" class="contributor-link">
          <div class="contributor-avatar">
            <el-image :src="contributor.avatar_url" fit="cover" class="avatar-image" />
          </div>
          <div class="contributor-info">
            <h4 class="contributor-name">{{ contributor.login }}</h4>
            <p class="contribution-count">
              {{ contributor.contributions }} contribution{{ contributor.contributions !== 1 ? 's' : '' }}
            </p>
          </div>
        </a>
      </div>
    </div>
    
    <div class="view-more-container" v-if="!loading && !error && contributors.length > 0">
      <a href="https://github.com/bigbio/quantms/graphs/contributors" target="_blank" class="view-more-link">
        <el-button type="primary">View All Contributors on GitHub</el-button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const contributors = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchContributors = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // GitHub API endpoint for quantms contributors
    const response = await fetch('https://api.github.com/repos/bigbio/quantms/contributors?per_page=100');
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    contributors.value = data;
  } catch (err) {
    console.error('Error fetching GitHub contributors:', err);
    error.value = 'Unable to load contributors. GitHub API rate limits may apply.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchContributors();
});
</script>

<style lang="scss" scoped>
.github-contributors-component {
  width: 100%;
}

.loading-container,
.error-container {
  padding: $spacing-lg;
  text-align: center;
}

.error-message {
  color: $error-color;
  margin-bottom: $spacing-md;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.contributor-card {
  background-color: $white;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: $transition-base;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.contributor-link {
  display: block;
  padding: $spacing-md;
  text-decoration: none;
  color: $text-color;
}

.contributor-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: $spacing-sm;
  
  .avatar-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}

.contributor-info {
  text-align: center;
}

.contributor-name {
  font-size: $font-size-base;
  font-weight: 500;
  margin-bottom: $spacing-xs;
}

.contribution-count {
  font-size: $font-size-small;
  color: $text-light-color;
}

.view-more-container {
  display: flex;
  justify-content: center;
  margin-top: $spacing-lg;
}

.view-more-link {
  text-decoration: none;
}
</style>