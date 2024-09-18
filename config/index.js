const config = {
    HARDCODED_DOMAIN: process.env.NEXT_PUBLIC_HARDCODED_DOMAIN || "simplylivinghomes.com.au",
    API_URL: process.env.STRAPI_API_URL || '0',
    API_TOKEN: process.env.STRAPI_API_TOKEN || '0',
  };
  
  export default config;