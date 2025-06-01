<template>
  <div v-if="false"><!-- Meta component doesn't render anything visible --></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const baseUrl = 'https://quantms.org';

// Default meta information
const defaultMeta = {
  title: 'quantms - Cloud-based Pipeline for Quantitative Proteomics',
  description: 'quantms is a bioinformatics best-practice analysis pipeline for Quantitative Mass Spectrometry (MS), including DDA-LFQ, plexDDA (TMT, iTRAQ), and DIA.',
  keywords: 'quantms, proteomics, mass spectrometry, bioinformatics, DDA-LFQ, TMT, iTRAQ, DIA, OpenMS',
  author: 'Yasset Perez-Riverol, Timo Sachsenberg, Mingze Bai, Chengxin Dai',
  image: `${baseUrl}/logo.png`
};

// Route-specific meta information
const routeMeta = {
  '/': defaultMeta,
  '/publications': {
    title: 'Publications - quantms',
    description: 'Scientific publications related to quantms, including research papers using the quantms pipeline and its components.',
    keywords: 'quantms publications, proteomics research, mass spectrometry papers, scientific publications',
  },
  '/datasets': {
    title: 'Datasets - quantms',
    description: 'Browse and access proteomics datasets reanalyzed using the quantms pipeline, including absolute expression, differential expression, and single-cell data.',
    keywords: 'proteomics datasets, mass spectrometry data, reanalyzed data, expression data',
  },
  '/about': {
    title: 'About - quantms',
    description: 'Learn about the quantms team, contributors, and the development of this cloud-based pipeline for quantitative proteomics.',
    keywords: 'quantms team, proteomics pipeline, development team, contributors',
  }
};

onMounted(() => {
  // Get meta info for current route
  const meta = routeMeta[route.path] || defaultMeta;

  // Update meta tags
  document.title = meta.title;
  updateMetaTag('description', meta.description);
  updateMetaTag('keywords', meta.keywords);
  updateMetaTag('author', meta.author || defaultMeta.author);

  // Open Graph meta tags
  updateMetaTag('og:title', meta.title);
  updateMetaTag('og:description', meta.description);
  updateMetaTag('og:image', meta.image || defaultMeta.image);
  updateMetaTag('og:url', `${baseUrl}${route.path}`);
  updateMetaTag('og:type', 'website');

  // Twitter Card meta tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', meta.title);
  updateMetaTag('twitter:description', meta.description);
  updateMetaTag('twitter:image', meta.image || defaultMeta.image);

  // Schema.org structured data
  if (route.path === '/publications') {
    addSchemaOrgScript();
  }
});

// Helper function to update meta tags
const updateMetaTag = (name, content) => {
  let element = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

// Add Schema.org structured data for publications
const addSchemaOrgScript = () => {
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "quantms Publications",
    "description": "Scientific publications related to quantms and its applications in proteomics",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ScholarlyArticle",
          "headline": "quantms: a cloud-based pipeline for quantitative proteomics enables the reanalysis of public proteomics data",
          "author": [
            {
              "@type": "Person",
              "name": "Chengxin Dai"
            },
            {
              "@type": "Person",
              "name": "Yasset Perez-Riverol"
            }
          ],
          "datePublished": "2024-09",
          "publisher": {
            "@type": "Organization",
            "name": "Nature Methods"
          },
          "isAccessibleForFree": true
        }
      ]
    }
  };
  
  script.textContent = JSON.stringify(schemaData);
  document.head.appendChild(script);
};
</script> 