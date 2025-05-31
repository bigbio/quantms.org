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
              <el-image :src="ebiLogo" fit="contain" class="team-logo ebi-logo" alt="EMBL-EBI Logo" />
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
        <h2 class="category-title">Core Contributors</h2>
        
        <div class="top-contributors-container">
          <div class="contributor-cards">
            <!-- Contributor 1 - Yasset -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/ypriverol" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/52113?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/ypriverol" target="_blank" class="github-link">Yasset Perez-Riverol</a>
                </h3>
                <p class="contributor-role">Project Lead</p>
                <p class="contribution-summary">
                  Project coordination and development of the quantms ecosystem
                </p>
              </div>
            </div>

            <!-- Contributor 2 - Dai -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/daichengxin" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/37200167?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/daichengxin" target="_blank" class="github-link">Chengxin Dai</a>
                </h3>
                <p class="contributor-role">Core Developer</p>
                <p class="contribution-summary">
                  Lead developer of quantms workflow and data analysis pipelines
                </p>
              </div>
            </div>

            <!-- Contributor 3 - Julianus -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/jpfeuffer" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/8102638?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/jpfeuffer" target="_blank" class="github-link">Julianus Pfeuffer</a>
                </h3>
                <p class="contributor-role">OpenMS Core Developer</p>
                <p class="contribution-summary">
                  Major contributions to OpenMS and quantms workflow development
                </p>
              </div>
            </div>

            <!-- Contributor 4 - Timo -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/timosachsenberg" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/5803621?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/timosachsenberg" target="_blank" class="github-link">Timo Sachsenberg</a>
                </h3>
                <p class="contributor-role">OpenMS Lead Developer</p>
                <p class="contribution-summary">
                  Lead developer of OpenMS and quantitative proteomics workflows
                </p>
              </div>
            </div>

            <!-- Contributor 5 - Fabian -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/fabianegli" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/8569110?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/fabianegli" target="_blank" class="github-link">Fabian Egli</a>
                </h3>
                <p class="contributor-role">Bioinformatician</p>
                <p class="contribution-summary">
                  Key contributions to workflow development and testing
                </p>
              </div>
            </div>

            <!-- Contributor 6 - Henry -->
            <div class="contributor-card">
              <div class="contributor-avatar">
                <a href="https://github.com/enryH" target="_blank">
                  <el-avatar :size="80" src="https://avatars.githubusercontent.com/u/2833836?s=60&v=4" />
                </a>
              </div>
              <div class="contributor-info">
                <h3 class="contributor-name">
                  <a href="https://github.com/enryH" target="_blank" class="github-link">Henry Webel</a>
                </h3>
                <p class="contributor-role">Core Developer</p>
                <p class="contribution-summary">
                  Key contributions to quantms workflow development and testing
                </p>
              </div>
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
  margin: 0 auto;
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
  justify-content: center;
  align-items: center;
  margin-bottom: $spacing-xl;
}

.team-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: $border-radius;
}

.ebi-logo {
  width: 200px;
  height: 160px;
}

.team-content {
  text-align: center;
}

.team-leader {
  margin-bottom: $spacing-md;
}

.leader-name {
  font-size: $font-size-large;
  color: $text-color;
  margin-bottom: $spacing-xs;
}

.leader-position {
  font-size: $font-size-base;
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

.top-contributors-container {
  margin: $spacing-lg 0;
}

.contributor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.contributor-card {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.contributor-avatar {
  margin-bottom: $spacing-md;
}

.contributor-info {
  flex: 1;
}

.contributor-name {
  font-size: $font-size-base;
  color: $text-color;
  margin-bottom: $spacing-xs;
  font-weight: 600;
}

.contributor-role {
  font-size: $font-size-small;
  color: $primary-color;
  margin-bottom: $spacing-sm;
  font-weight: 500;
}

.contribution-summary {
  font-size: $font-size-small;
  color: $text-light-color;
  line-height: 1.4;
}
</style>