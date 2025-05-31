<template>
  <div class="publications-page">
    <section class="publications-section">
      <div class="publication-category container">
        <h2 class="category-title">Main Publication</h2>
        <div class="publication-card">
          <h3 class="publication-title">
            quantms: a cloud-based pipeline for quantitative proteomics enables the reanalysis of public proteomics data
          </h3>
          <p class="publication-authors">
            Dai C, Pfeuffer J, Wang H, Zheng P, Käll L, Sachsenberg T, Demichev V, Bai M, Kohlbacher O, Perez-Riverol Y.
          </p>
          <p class="publication-journal">
            Nature Methods. 2024 Sep;21(9):1603-1607.
          </p>
          <p class="publication-details">
            doi: 10.1038/s41592-024-02343-1. Epub 2024 Jul 4. PMID: 38965444; PMCID: PMC11399091.
          </p>
          <div class="publication-links">
            <a href="https://doi.org/10.1038/s41592-024-02343-1" target="_blank" class="publication-link">
              <el-button type="primary" size="small">View Publication</el-button>
            </a>
          </div>
        </div>
      </div>

      <div class="publication-category container">
        <h2 class="category-title">Publications</h2>

        <el-tabs type="border-card" class="publication-tabs">
          <el-tab-pane label="Team Publications (7)">
            <div class="publications-table-container">
              <table class="publications-table">
                <thead>
                  <tr>
                    <th>Citation</th>
                    <th class="link-column">Link</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 2025 Publications -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Zheng P, Audain E, Webel H, Dai C, Klein J, Hitz MP, Sachsenberg T, Bai M, Perez-Riverol Y. (2025). Ibaqpy: A scalable Python package for baseline quantification in proteomics leveraging SDRF metadata. <em>Journal of Proteomics</em>, 317:105440. doi: 10.1016/j.jprot.2025.105440. PMID: 40268243.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1016/j.jprot.2025.105440" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <!-- 2024 Publications -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Pfeuffer J, Bielow C, Wein S, Jeong K, Netz E, Walter A, Alka O, Nilse L, Colaianni PD, McCloskey D, Kim J, Rosenberger G, Bichmann L, Walzer M, Veit J, Boudaud B, Bernt M, Patikas N, Pilz M, Startek MP, Kutuzova S, Heumos L, Charkow J, Sing JC, Feroz A, Siraj A, Weisser H, Dijkstra TMH, Perez-Riverol Y, Röst H, Kohlbacher O, Sachsenberg T. (2024). OpenMS 3 enables reproducible analysis of large-scale mass spectrometry data. <em>Nature Methods</em>, 21(3):365-367. doi: 10.1038/s41592-024-02197-7. PMID: 38366242.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1038/s41592-024-02197-7" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <!-- 2023 Publications -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Wang H, Dai C, Pfeuffer J, Sachsenberg T, Sanchez A, Bai M, Perez-Riverol Y. (2023). Tissue-based absolute quantification using large-scale TMT and LFQ experiments. <em>Proteomics</em>, 23(20):e2300188. doi: 10.1002/pmic.202300188. PMID: 37488995.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1002/pmic.202300188" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p class="citation-text">
                        Bai M, Deng J, Dai C, Pfeuffer J, Sachsenberg T, Perez-Riverol Y. (2023). LFQ-Based Peptide and Protein Intensity Differential Expression Analysis. <em>Journal of Proteome Research</em>, 22(6):2114-2123. doi: 10.1021/acs.jproteome.2c00812. PMID: 37220883; PMCID: PMC10243145.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1021/acs.jproteome.2c00812" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <!-- 2022 Publications -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Umer HM, Audain E, Zhu Y, Pfeuffer J, Sachsenberg T, Lehtiö J, Branca RM, Perez-Riverol Y. (2022). Generation of ENSEMBL-based proteogenomics databases boosts the identification of non-canonical peptides. <em>Bioinformatics</em>, 38(5):1470-1472. doi: 10.1093/bioinformatics/btab838. PMID: 34904638; PMCID: PMC8825679.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1093/bioinformatics/btab838" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <!-- 2021 Publications -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Dai C, Füllgrabe A, Pfeuffer J, Solovyeva EM, Deng J, Moreno P, Kamatchinathan S, Kundu DJ, George N, Fexova S, Grüning B, Föll MC, Griss J, Vaudel M, Audain E, Locard-Paulet M, Turewicz M, Eisenacher M, Uszkoreit J, Van Den Bossche T, Schwämmle V, Webel H, Schulze S, Bouyssié D, Jayaram S, Duggineni VK, Samaras P, Wilhelm M, Choi M, Wang M, Kohlbacher O, Brazma A, Papatheodorou I, Bandeira N, Deutsch EW, Vizcaíno JA, Bai M, Sachsenberg T, Levitsky LI, Perez-Riverol Y. (2021). A proteomics sample metadata representation for multiomics integration and big data analysis. <em>Nature Communications</em>, 12(1):5854. doi: 10.1038/s41467-021-26111-3. PMID: 34615866; PMCID: PMC8494749.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1038/s41467-021-26111-3" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p class="citation-text">
                        Wang D, Bouwmeester R, Zheng P, Dai C, Sanchez A, Shu K, Bai M, Umer HM, Perez-Riverol Y. (2024). Proteogenomics analysis of human tissues using pangenomes. <em>bioRxiv</em> 2024.05.24.595489. doi: 10.1101/2024.05.24.595489.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1101/2024.05.24.595489" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Using quantms (3)">
            <div class="publications-table-container">
              <table class="publications-table">
                <thead>
                  <tr>
                    <th>Citation</th>
                    <th class="link-column">Link</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Publications using quantms framework -->
                  <tr>
                    <td>
                      <p class="citation-text">
                        Truong P, The M, Käll L. (2023). Triqler for Protein Summarization of Data from Data-Independent Acquisition Mass Spectrometry. <em>J Proteome Res</em>, 22(4):1359-1366. doi: 10.1021/acs.jproteome.2c00607. PMID: 36988210; PMCID: PMC10088044.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1021/acs.jproteome.2c00607" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p class="citation-text">
                        Siaperas R, Taxeidis G, Gioti A, Nikolaivits E, Topakas E. (2025). Multi-omics insights into the response of Aspergillus parasiticus to long-chain alkanes in relation to polyethylene modification. <em>Environmental Pollution</em>, 376:126386. doi: 10.1016/j.envpol.2025.126386. PMID: 40345371.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1016/j.envpol.2025.126386" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p class="citation-text">
                        Taxeidis G, Siaperas R, Foka K, Ponjavic M, Nikodinovic-Runic J, Zerva A, Topakas E. (2025). Elucidating the enzymatic response of the white rot basidiomycete Abortiporus biennis for the downgrade of polystyrene. <em>Environmental Pollution</em>, 374:126214. doi: 10.1016/j.envpol.2025.126214. PMID: 40189091.
                      </p>
                    </td>
                    <td class="link-column">
                      <a href="https://doi.org/10.1016/j.envpol.2025.126214" target="_blank" class="publication-link">
                        <el-button type="primary" size="small">View</el-button>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <section class="publications-section">
      <div class="publication-category container">
        <h2 class="category-title">How to Cite quantms</h2>
        
        <div class="citation-guidelines">
          <p class="citation-intro">
            If you use quantms or the data generated within quantms.org, please cite the main publication:
          </p>
          
          <div class="citation-example">
            <div class="example-content">
              <p class="citation-text-example">
                Dai C, Pfeuffer J, Wang H, Zheng P, Käll L, Sachsenberg T, Demichev V, Bai M, Kohlbacher O, Perez-Riverol Y. (2024). quantms: a cloud-based pipeline for quantitative proteomics enables the reanalysis of public proteomics data. <em>Nature Methods</em>, 21(9):1603-1607. doi: <a href="https://doi.org/10.1038/s41592-024-02343-1" target="_blank">10.1038/s41592-024-02343-1</a>.
              </p>
            </div>
          </div>
          
          <div class="citation-note">
            <p>
              If you use any of the quantms components, please cite the relevant publication from our list of team publications.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Publications page component
</script>

<style lang="scss" scoped>
.publications-page {
  padding: $spacing-md 0;
  width: 100%;
}

.publications-section {
  margin: $spacing-xl 0;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 100%;
}

.section-title {
  font-size: $font-size-xlarge;
  color: $text-color;
  margin-bottom: $spacing-xl;
  text-align: center;
}

.publication-category {
  margin-bottom: $spacing-xxl;
}

.category-title {
  font-size: $font-size-large;
  color: $primary-color;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-xs;
  border-bottom: 2px solid $border-color;
}

.publication-card {
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

.publication-title {
  font-size: $font-size-large;
  color: $text-color;
  margin-bottom: $spacing-sm;
}

.publication-authors {
  font-size: $font-size-base;
  color: $text-color;
  margin-bottom: $spacing-sm;
}

.publication-journal {
  font-size: $font-size-base;
  font-style: italic;
  color: $text-light-color;
  margin-bottom: $spacing-xs;
}

.publication-details {
  font-size: $font-size-small;
  color: $text-light-color;
  margin-bottom: $spacing-md;
}

.publication-links {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
}

.publication-link {
  text-decoration: none;
}

/* Table styles for Other Publications */
.publications-table-container {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 450px;
  margin-bottom: $spacing-lg;
}

.publications-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid $border-color;
  background-color: $white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.publications-table th,
.publications-table td {
  padding: $spacing-md;
  border: 1px solid $border-color;
  vertical-align: top;
  text-align: left;
}

.publications-table th {
  background-color: $background-color;
  font-weight: bold;
  text-align: left;
  color: $primary-color;
}

.publications-table tr:hover {
  background-color: $background-color;
}

.citation-text {
  margin: 0;
  font-size: $font-size-base;
  line-height: 1.5;
  text-align: left;
}

.citation-text em {
  font-style: italic;
}

.link-column {
  width: 80px;
  text-align: center;
  white-space: nowrap;
}

/* Tab styles */
.publication-tabs {
  margin-top: $spacing-md;
  margin-bottom: $spacing-lg;
}

.publication-tabs :deep(.el-tabs__header) {
  margin-bottom: $spacing-md;
}

.publication-tabs :deep(.el-tabs__item) {
  font-size: $font-size-base;
  height: 40px;
  line-height: 40px;
}

.publication-tabs :deep(.el-tabs__item.is-active) {
  color: $primary-color;
  font-weight: bold;
}

.publication-tabs :deep(.el-tabs__active-bar) {
  background-color: $primary-color;
}

.publication-tabs :deep(.el-tabs__content) {
  padding: $spacing-md;
}

/* Citation Guidelines Styles */
.citation-guidelines {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.citation-intro {
  font-size: $font-size-base;
  line-height: 1.6;
  margin-bottom: $spacing-md;
  color: $text-color;
}

.citation-subheading {
  font-size: $font-size-base;
  color: $primary-color;
  margin-top: $spacing-lg;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-xs;
  border-bottom: 1px solid $border-color;
}

.citation-list {
  list-style-type: disc;
  padding-left: $spacing-lg;
  margin-bottom: $spacing-md;
  
  li {
    margin-bottom: $spacing-xs;
    line-height: 1.5;
    color: $text-color;
  }
}

.citation-example {
  margin-bottom: $spacing-md;
  padding: $spacing-md;
  background-color: $background-color;
  border-radius: $border-radius;
  border-left: 3px solid $primary-color;
}

.example-title {
  font-size: $font-size-base;
  font-weight: bold;
  margin-bottom: $spacing-xs;
  color: $text-color;
}

.example-content {
  padding-left: $spacing-sm;
}

.citation-text-example {
  font-size: $font-size-small;
  line-height: 1.5;
  color: $text-color;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
}

.citation-note {
  margin-top: $spacing-lg;
  padding: $spacing-md;
  background-color: rgba($primary-color, 0.05);
  border-radius: $border-radius;
  border-left: 3px solid $primary-color;
  
  p {
    font-size: $font-size-small;
    font-style: italic;
    color: $text-light-color;
    margin: 0;
  }
}
</style>