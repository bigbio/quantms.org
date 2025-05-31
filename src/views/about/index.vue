<template>
  <div class="about-page">
    <section class="about-section">
      <h1 class="section-title">About Us</h1>
      
      <div class="about-category container">
        <h2 class="category-title">Leading Teams</h2>
        
        <div class="teams-container">
          <!-- EMBL-EBI Team -->
          <div class="team-card">
            <div class="team-header">
              <el-image :src="ebiLogo" fit="contain" class="team-logo" alt="EMBL-EBI Logo" />
              <h3 class="team-title">EMBL-EBI PRIDE Team</h3>
            </div>
            <div class="team-content">
              <div class="team-leader">
                <h4 class="leader-name">Yasset Perez-Riverol, PhD</h4>
                <p class="leader-position">Team Coordinator at EMBL-EBI, PRIDE Team</p>
              </div>
              <p class="team-description">
                Leading the project development and coordination between different teams and institutions.
              </p>
            </div>
          </div>
          
          <!-- OpenMS Team -->
          <div class="team-card">
            <div class="team-header">
              <el-image :src="openMSLogo" fit="contain" class="team-logo" alt="OpenMS Logo" />
              <h3 class="team-title">OpenMS Team</h3>
            </div>
            <div class="team-content">
              <div class="team-leader">
                <h4 class="leader-name">Timo Sachsenberg, PhD</h4>
                <p class="leader-position">Lead Developer of OpenMS</p>
              </div>
              <p class="team-description">
                Providing expertise in mass spectrometry data analysis and software development.
              </p>
            </div>
          </div>
          
          <!-- CQUPT Team -->
          <div class="team-card">
            <div class="team-header">
              <el-image :src="cquptLogo" fit="contain" class="team-logo" alt="CQUPT Logo" />
              <h3 class="team-title">Chongqing University of Posts and Telecommunications</h3>
            </div>
            <div class="team-content">
              <div class="team-leader">
                <h4 class="leader-name">Mingze Bai, Professor</h4>
                <p class="leader-position">Chongqing Key Laboratory of Big Data for Bio Intelligence</p>
              </div>
              <p class="team-description">
                Contributing expertise in big data analysis and bioinformatics.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="about-category container">
        <h2 class="category-title">GitHub Contributors</h2>
        <p class="contributors-intro">
          We are grateful to all the contributors who have helped develop and improve quantms.
        </p>
        
        <div class="github-contributors-container">
          <p class="contributors-message">
            Our project is made possible by the contributions of many developers and researchers.
            We appreciate everyone who has contributed code, documentation, ideas, and feedback.
          </p>
          
          <GitHubContributors />
          
          <p class="contributors-tip">
            The quantms project is open source and welcomes new contributors.
            Visit our <a href="https://github.com/bigbio/quantms" target="_blank" class="github-link">GitHub repository</a>
            to learn how you can get involved.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ebiLogo from "@/assets/icons/ebi.jpg";
import openMSLogo from "@/assets/icons/openMS.png";
import cquptLogo from "@/assets/icons/cqupt.jpg";
import GitHubContributors from "@/components/GitHubContributors";
</script>

<style lang="scss" scoped>
.about-page {
  padding: $spacing-md 0;
  width: 100%;
}

.about-section {
  margin: $spacing-xl 0;
  width: 100%;
}

.section-title {
  font-size: $font-size-xlarge;
  color: $text-color;
  margin-bottom: $spacing-xl;
  text-align: center;
}

.container {
  width: 100%;
  max-width: 100%;
}

.about-category {
  margin-bottom: $spacing-xxl;
}

.category-title {
  font-size: $font-size-large;
  color: $primary-color;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-xs;
  border-bottom: 2px solid $border-color;
}

.teams-container {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-lg;
  
  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.team-card {
  flex: 1;
  min-width: 300px;
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: $transition-base;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.team-header {
  display: flex;
  align-items: center;
  margin-bottom: $spacing-md;
}

.team-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: $spacing-md;
  border-radius: $border-radius;
}

.team-title {
  font-size: $font-size-base;
  color: $text-color;
  font-weight: bold;
}

.team-content {
  padding-left: $spacing-sm;
}

.team-leader {
  margin-bottom: $spacing-sm;
}

.leader-name {
  font-size: $font-size-base;
  color: $text-color;
  margin-bottom: $spacing-xs;
}

.leader-position {
  font-size: $font-size-small;
  color: $text-light-color;
  margin-bottom: $spacing-xs;
}

.team-description {
  font-size: $font-size-base;
  color: $text-color;
  line-height: 1.5;
}

.contributors-intro {
  font-size: $font-size-base;
  color: $text-color;
  margin-bottom: $spacing-lg;
  line-height: 1.5;
}

.github-contributors-container {
  width: 100%;
  margin-bottom: $spacing-lg;
  padding: $spacing-lg;
  background-color: $white;
  border-radius: $border-radius;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.contributors-message {
  font-size: $font-size-base;
  color: $text-color;
  line-height: 1.6;
  margin-bottom: $spacing-lg;
  text-align: center;
}

.contributors-tip {
  font-size: $font-size-small;
  color: $text-light-color;
  text-align: center;
  margin-top: $spacing-lg;
  line-height: 1.5;
}

.github-link {
  color: $primary-color;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
}
</style>