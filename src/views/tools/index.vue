<template>
  <div class="tools-page">
    <section class="tools-header">
      <h1 class="page-title">Tools & Libraries</h1>
      <p class="page-description">
        Explore the ecosystem of tools and libraries that power the quantms workflow
      </p>
    </section>

    <!-- Tools with Citations -->
    <section class="tools-section">
      <h2 class="section-title">Published Tools</h2>
      <div class="tools-grid">
        <!-- SDRF Pipelines -->
        <el-card class="tool-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tool-header sdrf-color">
            <h2 class="tool-title">SDRF Pipelines</h2>
          </div>
          <div class="tool-content">
            <p class="tool-description">
              A set of tools to validate and convert SDRF files to other workflow configuration formats for proteomics analysis.
            </p>
            <div class="tool-citation">
              <h4>Citation:</h4>
              <p>Dai C, Füllgrabe A, Pfeuffer J, et al. A proteomics sample metadata representation for multiomics integration and big data analysis. Nat Commun. 2021;12(1):5854. doi: 10.1038/s41467-021-26111-3.</p>
            </div>
            <div class="tool-links">
              <a href="https://github.com/bigbio/sdrf-pipelines" target="_blank" class="tool-link">
                <el-button type="primary" plain>
                  <el-icon><Link /></el-icon>
                  GitHub
                </el-button>
              </a>
              <a href="https://sdrf-pipelines.readthedocs.io/" target="_blank" class="tool-link">
                <el-button plain>
                  <el-icon><Reading /></el-icon>
                  Docs
                </el-button>
              </a>
            </div>
          </div>
        </el-card>

        <!-- ibaqpy -->
        <el-card class="tool-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tool-header ibaqpy-color">
            <h2 class="tool-title">ibaqpy</h2>
          </div>
          <div class="tool-content">
            <p class="tool-description">
              A Python implementation of the intensity-based absolute quantification (iBAQ) method for protein quantification.
            </p>
            <div class="tool-citation">
              <h4>Citation:</h4>
              <p>Zheng P, Audain E, Webel H, Dai C, Klein J, Hitz MP, Sachsenberg T, Bai M, Perez-Riverol Y. Ibaqpy: A scalable Python package for baseline quantification in proteomics leveraging SDRF metadata. J Proteomics. 2025;317:105440. doi: 10.1016/j.jprot.2025.105440.</p>
            </div>
            <div class="tool-links">
              <a href="https://github.com/bigbio/ibaqpy" target="_blank" class="tool-link">
                <el-button type="primary" plain>
                  <el-icon><Link /></el-icon>
                  GitHub
                </el-button>
              </a>
              <a href="https://ibaqpy.readthedocs.io/" target="_blank" class="tool-link">
                <el-button plain>
                  <el-icon><Reading /></el-icon>
                  Docs
                </el-button>
              </a>
            </div>
          </div>
        </el-card>
      </div>
    </section>

    <!-- Tools without Citations -->
    <section class="tools-section">
      <h2 class="section-title">Additional Tools</h2>
      <div class="tools-grid">
        <!-- pmultiqc -->
        <el-card class="tool-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tool-header pmultiqc-color">
            <h2 class="tool-title">pmultiqc</h2>
          </div>
          <div class="tool-content">
            <p class="tool-description">
              A MultiQC plugin for visualizing and aggregating quality control metrics from proteomics data analysis workflows.
            </p>
            <div class="tool-links">
              <a href="https://github.com/bigbio/pmultiqc" target="_blank" class="tool-link">
                <el-button type="primary" plain>
                  <el-icon><Link /></el-icon>
                  GitHub
                </el-button>
              </a>
              <a href="https://pmultiqc.quantms.org/" target="_blank" class="tool-link">
                <el-button plain>
                  <el-icon><Reading /></el-icon>
                  Docs
                </el-button>
              </a>
            </div>
          </div>
        </el-card>

        <!-- quantms.io -->
        <el-card class="tool-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tool-header quantms-color">
            <h2 class="tool-title">quantms.io</h2>
          </div>
          <div class="tool-content">
            <p class="tool-description">
              A standardized format for representing quantitative proteomics data, extending mzTab for large-scale datasets. It provides a unified output format for the quantms workflow results.
            </p>
            <div class="tool-links">
              <a href="https://github.com/bigbio/quantms.io" target="_blank" class="tool-link">
                <el-button type="primary" plain>
                  <el-icon><Link /></el-icon>
                  GitHub
                </el-button>
              </a>
              <a href="https://io.quantms.org/" target="_blank" class="tool-link">
                <el-button plain>
                  <el-icon><Reading /></el-icon>
                  Docs
                </el-button>
              </a>
            </div>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Link, Reading } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.tools-page {
  padding: calc($header-height + $spacing-xl) $spacing-lg $spacing-xl;
  max-width: 1200px;
  margin: 0 auto;
}

.tools-header {
  text-align: center;
  margin-bottom: $spacing-xl;
}

.page-title {
  font-size: $font-size-2xl;
  color: $text-color;
  margin-bottom: $spacing-md;
}

.page-description {
  font-size: $font-size-lg;
  color: $text-light-color;
  max-width: 800px;
  margin: 0 auto;
}

.tools-section {
  margin-bottom: $spacing-xl;
}

.section-title {
  font-size: $font-size-xl;
  color: $primary-color;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-xs;
  border-bottom: 2px solid $border-color;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.tool-card {
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
  }
}

.tool-header {
  padding: $spacing-lg;
  color: $white;
}

.sdrf-color {
  background-color: #3498db;
}

.pmultiqc-color {
  background-color: #e74c3c;
}

.ibaqpy-color {
  background-color: #2ecc71;
}

.quantms-color {
  background-color: #9b59b6;
}

.tool-title {
  margin: 0;
  font-size: $font-size-xl;
}

.tool-content {
  padding: $spacing-lg;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-description {
  margin-bottom: $spacing-lg;
  color: $text-color;
  line-height: 1.6;
}

.tool-citation {
  margin-bottom: $spacing-lg;
  padding: $spacing-md;
  background-color: rgba($primary-color, 0.05);
  border-radius: $border-radius;

  h4 {
    margin: 0 0 $spacing-xs;
    color: $primary-color;
  }

  p {
    margin: 0;
    font-size: $font-size-small;
    color: $text-light-color;
  }
}

.tool-links {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  margin-top: auto;

  .tool-link {
    text-decoration: none;
  }

  .el-button {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }
}
</style> 