import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Seeding scripts...");

  // Limpar scripts existentes
  await prisma.script.deleteMany();

  // Scripts para SHR
  const shrScripts = [
    {
      name: "Google Tag Manager - SHR",
      type: "GOOGLE_TAG_MANAGER" as const,
      position: "HEAD" as const,
      site: "SHR" as const,
      order: 1,
      active: true,
      code: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4LJXG68');</script>
<!-- End Google Tag Manager -->`,
    },
    {
      name: "Google Tag Manager Noscript - SHR",
      type: "GOOGLE_TAG_MANAGER" as const,
      position: "BODY_START" as const,
      site: "SHR" as const,
      order: 2,
      active: true,
      code: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4LJXG68"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
    },
    {
      name: "Google Analytics 4 - SHR",
      type: "GOOGLE_ANALYTICS" as const,
      position: "HEAD" as const,
      site: "SHR" as const,
      order: 3,
      active: true,
      code: `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z2EQWFFMQC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Z2EQWFFMQC');
</script>
<!-- End Google Analytics 4 -->`,
    },
    {
      name: "Meta Pixel - SHR",
      type: "META_PIXEL" as const,
      position: "HEAD" as const,
      site: "SHR" as const,
      order: 4,
      active: true,
      code: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1609509633385345');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1609509633385345&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`,
    },
  ];

  // Scripts para Maletti
  const malettiScripts = [
    {
      name: "Google Tag Manager - Maletti",
      type: "GOOGLE_TAG_MANAGER" as const,
      position: "HEAD" as const,
      site: "MALETTI" as const,
      order: 1,
      active: true,
      code: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NHTPW27K');</script>
<!-- End Google Tag Manager -->`,
    },
    {
      name: "Google Tag Manager Noscript - Maletti",
      type: "GOOGLE_TAG_MANAGER" as const,
      position: "BODY_START" as const,
      site: "MALETTI" as const,
      order: 2,
      active: true,
      code: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NHTPW27K"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
    },
    {
      name: "Google Analytics 4 - Maletti",
      type: "GOOGLE_ANALYTICS" as const,
      position: "HEAD" as const,
      site: "MALETTI" as const,
      order: 3,
      active: true,
      code: `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SCQRQ9F9LD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SCQRQ9F9LD');
</script>
<!-- End Google Analytics 4 -->`,
    },
  ];

  // Inserir todos os scripts
  for (const script of [...shrScripts, ...malettiScripts]) {
    await prisma.script.create({ data: script });
    console.log(`  ✓ ${script.name}`);
  }

  console.log("✅ Scripts seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
