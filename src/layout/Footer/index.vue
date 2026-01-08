<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-info">
        <p class="copyright">© {{ currentYear }} QuantMS. All rights reserved.</p>
      </div>
      
      <div class="footer-partners">
        <el-link href="https://www.ebi.ac.uk/" target="_blank" type="primary" :underline="false" class="partner-link">
          <el-image :src="ebi" fit="contain" class="partner-logo ebi-logo" alt="EBI" />
        </el-link>
        
        <el-link href="http://www.cqupt.edu.cn/" target="_blank" type="primary" :underline="false" class="partner-link">
          <el-image :src="cqupt" fit="contain" class="partner-logo cqupt-logo" alt="CQUPT" />
        </el-link>
        
        <el-link href="https://openms.de/" target="_blank" type="primary" :underline="false" class="partner-link">
          <el-image :src="openMS" fit="contain" class="partner-logo openms-logo" alt="OpenMS" />
        </el-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import cqupt from '@/assets/icons/cqupt.jpg';
import ebi from '@/assets/icons/ebi.jpg';
import openMS from '@/assets/icons/openMS.png';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.site-footer {
  width: 100%;
  background-color: $white;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md 0;
  max-width: $container-max-width;
  margin: 0 auto;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-md;
  }
}

.footer-info {
  .copyright {
    font-size: $font-size-small;
    color: $text-light-color;
    margin: 0;
  }
}

.footer-partners {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  
  @media (max-width: $breakpoint-sm) {
    gap: $spacing-md;
  }
}

.partner-link {
  transition: $transition-base;
  
  &:hover {
    opacity: 0.8;
  }
}

.partner-logo {
  height: 30px;
  object-fit: contain;
}

.ebi-logo {
  width: 100px;
}

.cqupt-logo {
  width: 30px;
}

.openms-logo {
  width: 70px;
}
</style>
