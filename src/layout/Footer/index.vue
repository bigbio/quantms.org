<template>
  <div class="footer-box">
    <!-- <div class="footer-left">
      <el-link href="ypriverol@gmail.com" type="default" :underline="false">
        <span>Lisence</span>
      </el-link>
      <el-link
        href="https://ypriverol@gmail.com"
        type="default"
        :underline="false"
      >
        <span>Contact</span>
      </el-link>
      <el-link href="ypriverol@gmail.com" type="default" :underline="false">
        <span>Support</span>
      </el-link>
    </div> -->
    <div class="footer-right">
      <el-link href="https://www.ebi.ac.uk/" type="primary" :underline="false">
        <el-image
          style="width: 100px; height: 30px; margin-right: 20px"
          :src="ebi"
          fit="fill"
        />
      </el-link>
      <el-link
        href="http://www.cqupt.edu.cn/"
        type="primary"
        :underline="false"
      >
        <el-image
          style="width: 30px; height: 30px; margin-right: 20px"
          :src="cqupt"
          fit="fill"
        />
      </el-link>
      <el-link href="https://openms.de/" type="primary" :underline="false">
        <el-image style="width: 70px; height: 30px" :src="openMS" fit="fill" />
      </el-link>
    </div>
  </div>
</template>
<script setup>
import cqupt from '@/assets/icons/cqupt.jpg'
import ebi from '@/assets/icons/ebi.jpg'
import openMS from '@/assets/icons/openMS.png'
</script>
<style lang="scss" scoped>
.footer-box {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}
.footer-box span {
  margin-right: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 60px;
}
</style>
