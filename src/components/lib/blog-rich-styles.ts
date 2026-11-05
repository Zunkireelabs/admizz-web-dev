// Standard stylesheet for the "rich" blog post layout (key-facts card, callouts, tables, steps, FAQ, CTA banner,
// contents box, sources card). Posts normally carry this CSS in their own <style> block. When a Sanity post
// publishes the same markup WITHOUT any <style> block it would render as plain text, so PortableTextRenderer
// applies this stylesheet as a fallback (only in that case).
export const RICH_POST_FONT_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">';

export const RICH_POST_CSS = `
.container{max-width:100%;margin:0 auto;padding:48px 24px 72px;font-family:'Rubik',sans-serif;background:#faf8f3;color:#1a1a18;font-size:17px;line-height:1.85}
.quick-facts{font-family:'Rubik',sans-serif;background:#fff;border:1.5px solid #3C50A0;border-radius:12px;padding:28px 32px;margin-bottom:52px}
.quick-facts-title{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2A3D8F;margin-bottom:20px}
.facts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:20px}
.fact-item{display:flex;flex-direction:column;gap:4px}
.fact-label{font-size:11px;color:#7a7a74;text-transform:uppercase;letter-spacing:.08em}
.fact-value{font-size:15px;font-weight:600;color:#1a1a18}
h2{font-size:clamp(20px,2.8vw,26px);font-weight:700;color:#0d1b2a;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #C8D5EF;line-height:1.25}
.section{margin-bottom:56px}
p{margin-bottom:18px;color:#1a1a18}
p:last-child{margin-bottom:0}
strong{font-weight:600}
.callout{border-radius:10px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start}
.callout-icon{font-size:18px;flex-shrink:0;margin-top:2px}
.callout-body{flex:1;font-size:15px;line-height:1.75}
.callout-body strong{display:block;margin-bottom:4px}
.callout.tip{background:#e1f5ee;border-left:3px solid #0f6e56}
.callout.tip .callout-body{color:#085041}
.callout.warning{background:#EEF1FA;border-left:3px solid #5078B4}
.callout.warning .callout-body{color:#1e2e6a}
.callout.info{background:#faeaec;border-left:3px solid #9b2335}
.callout.info .callout-body{color:#6b1420}
.checklist{list-style:none;padding:0;margin:20px 0}
.checklist li{padding:10px 0 10px 36px;position:relative;border-bottom:1px solid #e0dbd0;font-size:15.5px;line-height:1.65}
.checklist li:last-child{border-bottom:none}
.checklist li::before{content:'';position:absolute;left:0;top:14px;width:18px;height:18px;border-radius:50%;background:#0f6e56 url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L3.5 6.5L9 1' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center}
.steps{list-style:none;padding:0;margin:24px 0;counter-reset:steps}
.steps li{counter-increment:steps;padding:20px 20px 20px 64px;position:relative;margin-bottom:14px;background:#fff;border-radius:10px;border:1px solid #e0dbd0;font-size:15.5px;line-height:1.7}
.steps li::before{content:counter(steps);position:absolute;left:18px;top:18px;width:30px;height:30px;border-radius:50%;background:#0d1b2a;color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center}
.steps li strong{display:block;font-size:15.5px;font-weight:600;margin-bottom:6px;color:#0d1b2a}
.pillars{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:16px;margin:28px 0}
.pillar-card{background:#fff;border:1px solid #e0dbd0;border-top:3px solid #3C50A0;border-radius:10px;padding:20px 18px}
.pillar-num{font-size:10px;font-weight:700;letter-spacing:.12em;color:#2A3D8F;text-transform:uppercase;margin-bottom:8px}
.pillar-title{font-size:16px;font-weight:700;color:#0d1b2a;margin-bottom:8px}
.pillar-desc{font-size:13.5px;color:#4a4a46;line-height:1.6}
.table-scroll{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;margin:24px 0;border-radius:8px;box-shadow:0 0 0 1px #e0dbd0}
.elig-table{width:100%;min-width:500px;border-collapse:collapse;font-size:15px}
.elig-table th{background:#0d1b2a;color:#fff;padding:11px 16px;text-align:left;font-weight:500;font-size:13px;letter-spacing:.04em}
.elig-table td{padding:12px 16px;border-bottom:1px solid #e0dbd0;vertical-align:top;line-height:1.55}
.elig-table tr:nth-child(even) td{background:#faf8f3}
.elig-table td:first-child{font-weight:600;color:#0d1b2a}
.timeline{margin:28px 0;position:relative;padding-left:26px}
.timeline::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:#e0dbd0}
.timeline-item{position:relative;margin-bottom:28px}
.timeline-item::before{content:'';position:absolute;left:-22px;top:5px;width:13px;height:13px;border-radius:50%;background:#3C50A0;border:2px solid #faf8f3;box-shadow:0 0 0 1px #3C50A0}
.timeline-date{font-size:11px;font-weight:700;color:#2A3D8F;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px}
.timeline-event{font-size:15.5px;font-weight:600;color:#1a1a18;margin-bottom:4px}
.timeline-note{font-size:14px;color:#4a4a46;line-height:1.6}
.inline-cta{background:#EAF0FA;border:1.5px solid #3C50A0;border-radius:10px;padding:22px 28px;margin:36px 0;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.inline-cta-text{flex:1;font-size:15px;color:#1e3a6a;line-height:1.55;min-width:200px}
.inline-cta-text strong{display:block;font-size:15.5px;margin-bottom:4px;color:#0d1b2a}
.inline-cta a{background:#0d1b2a;color:#fff;font-family:'Rubik',sans-serif;font-size:14px;font-weight:600;padding:10px 22px;border-radius:7px;text-decoration:none;white-space:nowrap}
.inline-cta a:hover{background:#3C50A0}
.cta-banner{background:linear-gradient(135deg,#0d1b2a 0%,#0d1282 100%);border-radius:16px;padding:48px 40px;margin:48px 0;text-align:center;position:relative;overflow:hidden}
.cta-banner::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:#0d1282}
.cta-banner::after{content:'';position:absolute;bottom:-80px;left:-40px;width:250px;height:250px;border-radius:50%;background:#0d1282}
.cta-banner h2{font-size:clamp(19px,2.8vw,26px);font-weight:700;color:#fff;border:none;padding:0;margin-bottom:12px;position:relative;z-index:1}
.cta-banner p{color:rgba(255,255,255,.72);font-size:16px;max-width:520px;margin:0 auto 28px;position:relative;z-index:1}
.cta-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;position:relative;z-index:1}
.btn-primary{background:#3C50A0;color:#fff;font-family:'Rubik',sans-serif;font-weight:600;font-size:15px;padding:13px 28px;border-radius:8px;text-decoration:none;display:inline-block}
.btn-primary:hover{background:#2A3D8F}
.btn-secondary{background:transparent;color:#fff;font-family:'Rubik',sans-serif;font-weight:600;font-size:15px;padding:12px 28px;border-radius:8px;text-decoration:none;display:inline-block;border:1.5px solid rgba(255,255,255,.35)}
.faq-item{border-bottom:1px solid #e0dbd0;padding:20px 0}
.faq-q{font-size:16.5px;font-weight:600;color:#0d1b2a;margin-bottom:10px}
.faq-a{font-size:15.5px;color:#4a4a46;line-height:1.75}
@media(max-width:600px){.facts-grid{grid-template-columns:1fr 1fr}.cta-banner{padding:36px 22px}.inline-cta{flex-direction:column}}
.toc{background:#fff;border:1px solid #e0dbd0;border-left:4px solid #3C50A0;border-radius:10px;padding:20px 26px;margin:0 0 44px}
.toc-title{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2A3D8F;margin-bottom:12px}
.toc ol{margin:0;padding-left:20px;columns:2;column-gap:32px}
.toc li{margin:0 0 8px;font-size:15px;line-height:1.45;break-inside:avoid}
.toc a{color:#0d1b2a;text-decoration:none;font-weight:500}
.toc a:hover{color:#3C50A0;text-decoration:underline}
.sources{background:#fff;border:1.5px solid #C8D5EF;border-radius:14px;padding:30px 32px;margin-top:56px}
.sources h2{margin-bottom:8px}
.sources-note{font-size:15px;color:#4a4a46;margin-bottom:18px}
.source-list{list-style:none;padding:0;margin:0}
.source-list li{margin:0}
.source-list a{display:flex;align-items:center;gap:14px;padding:13px 8px;border-top:1px solid #e0dbd0;text-decoration:none;color:#1a1a18;border-radius:6px}
.source-list li:first-child a{border-top:none}
.source-list a:hover{background:#f4f6ff}
.src-domain{flex:0 0 auto;background:#EAF0FA;color:#2A3D8F;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;white-space:nowrap}
.src-title{flex:1;font-size:15px;line-height:1.45}
.src-arrow{flex:0 0 auto;color:#3C50A0;font-weight:700}
.checked-note{margin-top:18px;padding:12px 16px;background:#faf8f3;border-radius:8px;font-size:14px;color:#5C7189}
@media(max-width:600px){.toc ol{columns:1}.sources{padding:22px 16px}.src-domain{display:none}}
`;

// Markup markers that mean "this body expects the rich stylesheet".
export const RICH_POST_MARKERS = /class="(?:quick-facts|elig-table|cta-banner|faq-item|callout|checklist|steps|pillars|timeline|inline-cta)\b/;

// One shared look for every raw-HTML post. Posts carry their own <style> (cream page box, gold/green callouts,
// rounded fact cards). This sheet is appended AFTER a post's own CSS, so all posts match the repo-written posts:
// flush white body, navy facts strip, one callout style, navy table headers, site-colored CTAs. Posts keep any
// layout classes this sheet does not mention (timelines, pillars, cards). Change the look here, not per post.
export const BLOG_SHARED_OVERRIDES = `
.blog-raw-content h2{border-bottom-color:#C8D5EF!important}
.blog-raw-content .container{background:transparent!important;padding:0!important;max-width:100%!important}
.blog-raw-content .section{margin-bottom:40px!important}
.blog-raw-content .quick-facts{background:#fff!important;border:1px solid #e3e6f0!important;border-top:3px solid #001353!important;border-radius:6px!important;padding:20px 24px!important;margin-bottom:36px!important;box-shadow:none!important}
.blog-raw-content .quick-facts-title{color:#001353!important}
.blog-raw-content .fact-label{color:#5C7189!important}
.blog-raw-content .fact-value{color:#001353!important}
.blog-raw-content .callout,.blog-raw-content .callout.tip,.blog-raw-content .callout.warning,.blog-raw-content .callout.info{background:#F4F6FF!important;border:0!important;border-left:3px solid #31429C!important;border-radius:0 8px 8px 0!important}
.blog-raw-content .callout .callout-body,.blog-raw-content .callout.tip .callout-body,.blog-raw-content .callout.warning .callout-body,.blog-raw-content .callout.info .callout-body{color:#1a1a18!important}
.blog-raw-content .checklist li::before{background-color:#31429C!important}
.blog-raw-content .steps li::before{background:#001353!important}
.blog-raw-content .elig-table th{background:#001353!important;color:#fff!important}
.blog-raw-content .elig-table tr:nth-child(even) td{background:#F8F8F8!important}
.blog-raw-content .table-scroll{box-shadow:0 0 0 1px #D7DAE8!important}
.blog-raw-content .inline-cta{background:#F4F6FF!important;border:1px solid #D7DAE8!important}
.blog-raw-content .inline-cta-text,.blog-raw-content .inline-cta-text strong{color:#001353!important}
.blog-raw-content .inline-cta a,.blog-raw-content .btn-primary{background:#FDED22!important;color:#000!important}
.blog-raw-content .cta-banner{background:linear-gradient(135deg,#31429C 0%,#0D1282 100%)!important}
.blog-raw-content .btn-secondary{border-color:rgba(255,255,255,.5)!important}
.blog-raw-content .faq-q{color:#001353!important}
.blog-raw-content .pillar-card{background:#F4F6FF!important;border-color:#D7DAE8!important}
.blog-raw-content .pillar-num{color:#31429C!important}
.blog-raw-content .timeline-item::before{background:#31429C!important;border-color:#31429C!important}
.blog-raw-content .timeline-date{color:#31429C!important}
.blog-raw-content .answer-box{background:#F4F6FF!important;border:0!important;border-left:3px solid #31429C!important}
.blog-raw-content .toc-title{color:#001353!important}
.blog-raw-content .btn-primary:hover,.blog-raw-content .inline-cta a:hover{background:#e6d61f!important}
`;
