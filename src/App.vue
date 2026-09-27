<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2,
  Command, Mail, Menu, Moon, Phone, Sun, X,
} from '@lucide/vue'
import { portfolio, portfolioConfig } from './data/portfolio.js'

const isDark = ref(document.documentElement.dataset.theme === 'dark')
const menuOpen = ref(false)
const activeSection = ref('home')
const selectedProject = ref(null)
const modalCloseButton = ref(null)
const year = new Date().getFullYear()
const experienceDates = portfolio.experience.dates.split(' – ')
const themeLabel = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme')
let sectionObserver
let revealObserver
let systemThemeQuery
let modalTrigger

function applyTheme(value) {
  isDark.value = value
  document.documentElement.dataset.theme = value ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value ? '#111815' : '#f4f6f2')
}

function toggleTheme() {
  const nextTheme = !isDark.value
  localStorage.setItem('portfolio-theme', nextTheme ? 'dark' : 'light')
  applyTheme(nextTheme)
}

function closeMenu() {
  menuOpen.value = false
}

function openProject(project, event) {
  modalTrigger = event.currentTarget
  selectedProject.value = project
  nextTick(() => modalCloseButton.value?.focus())
}

function closeProject() {
  if (!selectedProject.value) return
  selectedProject.value = null
  nextTick(() => modalTrigger?.focus())
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (selectedProject.value) closeProject()
    else closeMenu()
    return
  }

  if (event.key !== 'Tab' || !selectedProject.value) return
  const dialog = document.querySelector('.project-dialog')
  const focusable = [...dialog.querySelectorAll('button, a[href]')]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function submitContact(event) {
  const values = new FormData(event.currentTarget)
  const subject = encodeURIComponent(`Portfolio message from ${String(values.get('name'))}`)
  const body = encodeURIComponent(
    `Name: ${String(values.get('name'))}\nEmail: ${String(values.get('email'))}\n\n${String(values.get('message'))}`,
  )
  window.location.href = `mailto:${portfolioConfig.EMAIL}?subject=${subject}&body=${body}`
}

function onSystemThemeChange(event) {
  if (!localStorage.getItem('portfolio-theme')) applyTheme(event.matches)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('portfolio-theme')
  systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  applyTheme(savedTheme ? savedTheme === 'dark' : systemThemeQuery.matches)
  systemThemeQuery.addEventListener('change', onSystemThemeChange)
  window.addEventListener('keydown', handleKeydown)

  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
    if (visible.length) {
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      activeSection.value = visible[0].target.id
    }
  }, { rootMargin: '-16% 0px -72% 0px', threshold: 0 })
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section))

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  document.documentElement.classList.add('reveal-ready')
  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  revealObserver?.disconnect()
  systemThemeQuery?.removeEventListener('change', onSystemThemeChange)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="masthead">
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="brand" href="#home" aria-label="Srivani Golla, home" @click="closeMenu">
        <span class="brand-mark">S<span>.</span></span>
        <span class="brand-name">SRIVANI GOLLA<small>SOFTWARE DEVELOPER</small></span>
      </a>
      <button class="menu-toggle" type="button" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" aria-controls="primary-links" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="20" /><Menu v-else :size="20" />
      </button>
      <div id="primary-links" class="nav-links" :class="{ 'nav-open': menuOpen }">
        <a v-for="link in portfolio.navLinks" :key="link.href" :href="link.href" :class="{ 'nav-active': activeSection === link.href.slice(1) }" :aria-current="activeSection === link.href.slice(1) ? 'location' : undefined" @click="closeMenu">{{ link.label }}</a>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle" type="button" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme"><Sun v-if="isDark" :size="17" /><Moon v-else :size="17" /></button>
        <a class="nav-cta" href="#contact">Let’s talk <ArrowUpRight :size="15" /></a>
      </div>
    </nav>
  </header>

  <main id="main">
    <section id="home" class="hero page-shell">
      <div class="hero-copy" data-reveal>
        <p class="eyebrow"><span class="status-dot"></span> SOFTWARE DEVELOPMENT · WEB DEVELOPMENT</p>
        <h1>{{ portfolio.name }}</h1>
        <p class="hero-role">{{ portfolio.role }}<span></span>{{ portfolio.educationTitle }}</p>
        <p class="hero-description">Building responsive, efficient, and scalable software solutions with modern web technologies.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">VIEW MY WORK <ArrowDown :size="15" /></a>
          <a v-if="portfolioConfig.RESUME_URL" class="button button-outline" :href="portfolioConfig.RESUME_URL" download>DOWNLOAD RESUME <ArrowDown :size="15" /></a>
          <a class="button button-quiet" href="#contact">CONTACT ME <ArrowRight :size="15" /></a>
        </div>
        <div class="hero-socials" aria-label="Social links">
          <a v-for="social in portfolio.socials" :key="social.label" :href="social.href" :aria-label="social.label" :title="social.label" :target="social.href.startsWith('http') ? '_blank' : undefined" :rel="social.href.startsWith('http') ? 'noopener noreferrer' : undefined"><span class="social-mark" aria-hidden="true">{{ social.mark }}</span>{{ social.label }}<ArrowUpRight v-if="social.href.startsWith('http')" :size="12" /></a>
        </div>
      </div>
      <div class="hero-visual" role="img" aria-label="Developer workspace showing code, build, debug, and deploy stages" data-reveal>
        <div class="visual-head"><span><i></i> DEV / WORKSPACE</span><span>SG-01</span></div>
        <div class="terminal-window" aria-hidden="true">
          <div class="terminal-head"><span></span><span></span><span></span><b>portfolio.js</b><i>•••</i></div>
          <div class="terminal-code"><p><span>01</span><b>const</b> developer = {</p><p><span>02</span>&nbsp; focus: <em>'problem solving'</em>,</p><p><span>03</span>&nbsp; build: <em>'responsive apps'</em>,</p><p><span>04</span>&nbsp; mindset: <em>'always learning'</em></p><p><span>05</span>}</p><p class="terminal-prompt"><span>06</span><i></i></p></div>
        </div>
        <div class="visual-flow"><span>CODE</span><i></i><span>BUILD</span><i></i><span>DEBUG</span><i></i><span>DEPLOY</span></div>
        <div class="visual-foot"><span><i></i> CURRENT FOCUS</span><span>SOFTWARE · WEB · CS</span></div><span class="visual-index" aria-hidden="true">01—04</span>
      </div>
      <a class="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown :size="14" /></a>
    </section>

    <section id="about" class="content-section page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">01 / ABOUT</span><h2>Curiosity, grounded<br /><span>in computer science.</span></h2></div><span class="section-aside">SOFTWARE DEVELOPMENT<br />WEB DEVELOPMENT</span></header>
      <div class="about-layout" data-reveal><p class="about-lead">A computer science student drawn to building useful software and understanding how each part works together.</p><div class="about-copy"><p>{{ portfolio.summary }}</p><div class="about-focus"><span>AREAS OF INTEREST</span><b>Problem solving</b><b>Responsive applications</b><b>Efficient solutions</b></div></div></div>
    </section>

    <section id="skills" class="content-section section-tint"><div class="page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">02 / TECHNICAL SKILLS</span><h2>Core skills.<br /><span>Useful foundations.</span></h2></div><span class="section-aside">A PRACTICAL TOOLKIT<br />BUILT ON FUNDAMENTALS</span></header>
      <div class="skills-grid"><article v-for="(group, index) in portfolio.skills" :key="group.category" class="skill-card" data-reveal><span class="skill-index">0{{ index + 1 }}</span><span class="skill-icon"><Code2 v-if="index < 2" :size="18" /><Command v-else :size="18" /></span><h3>{{ group.category }}</h3><div class="skill-list"><span v-for="skill in group.skills" :key="skill">{{ skill }}</span></div></article></div>
    </div></section>

    <section id="workflow" class="content-section page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">03 / WORKFLOW</span><h2>From first thought<br /><span>to considered delivery.</span></h2></div><p class="section-aside workflow-caption">A DEVELOPMENT MINDSET<br />NOT AN AUTOMATED PROCESS</p></header>
      <ol class="workflow-list" aria-label="Development workflow"><li v-for="(step, index) in portfolio.workflow" :key="step" data-reveal><span class="workflow-count">0{{ index + 1 }}</span><span class="workflow-node"><i></i></span><span>{{ step }}</span><ArrowRight v-if="index < portfolio.workflow.length - 1" :size="15" class="workflow-arrow" /></li></ol>
    </section>

    <section id="experience" class="content-section section-tint"><div class="page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">04 / EXPERIENCE</span><h2>Experience through<br /><span>hands-on work.</span></h2></div><span class="section-aside">WEB DEVELOPMENT<br />INTERNSHIP</span></header>
      <article class="experience-item" data-reveal><div class="experience-date"><span>{{ experienceDates[0] }}</span><i></i><span>{{ experienceDates[1] }}</span></div><div class="experience-marker"><i></i></div><div class="experience-content"><span class="experience-label">INTERNSHIP</span><h3>{{ portfolio.experience.title }}</h3><p class="experience-company">{{ portfolio.experience.company }}</p><ul><li v-for="item in portfolio.experience.responsibilities" :key="item">{{ item }}</li></ul></div></article>
    </div></section>

    <section id="projects" class="content-section page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">05 / PROJECTS</span><h2>Selected work.<br /><span>Made with purpose.</span></h2></div><span class="section-aside">THREE PROJECTS<br />DETAILS ON REQUEST</span></header>
      <div class="projects-grid"><article v-for="project in portfolio.projects" :key="project.number" class="project-card" data-reveal>
        <button class="project-open" type="button" :aria-label="`View details for ${project.name}`" @click="openProject(project, $event)">
          <span class="project-art" :class="`art-${project.visual}`" aria-hidden="true"><span class="art-topline"><span>PROJECT / {{ project.number }}</span><span>↗</span></span>
            <span v-if="project.visual === 'emotion'" class="emotion-art"><i class="emotion-ring ring-one"></i><i class="emotion-ring ring-two"></i><i class="emotion-core">♪</i><i class="emotion-node node-one">mood</i><i class="emotion-node node-two">music</i><i class="emotion-node node-three">signal</i></span>
            <span v-else-if="project.visual === 'voting'" class="vote-art"><span class="art-window"><i></i><i></i><i></i><b>vote.submit()</b></span><span class="art-check"><Check :size="16" /> VOTE RECORDED</span><span class="art-progress"><i></i></span></span>
            <span v-else class="todo-art"><span>today.tasks</span><i><Check :size="12" /> DOM manipulation</i><i><Check :size="12" /> Local storage</i><i class="todo-current"><span></span> Persistent tasks</i></span><span class="art-foot">{{ project.technologies.slice(0, 2).join(' · ') }}</span>
          </span>
          <span class="project-info"><span class="project-number">{{ project.number }} / 03 <ArrowUpRight :size="14" /></span><strong>{{ project.name }}</strong><span class="project-description">{{ project.description }}</span><span class="project-tags"><i v-for="technology in project.technologies" :key="technology">{{ technology }}</i></span></span>
        </button>
      </article></div>
    </section>

    <section id="education" class="content-section section-tint"><div class="page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">06 / EDUCATION</span><h2>Learning by<br /><span>building foundations.</span></h2></div><span class="section-aside">COMPUTER SCIENCE<br />ENGINEERING</span></header>
      <div class="education-timeline"><article v-for="(item, index) in portfolio.education" :key="item.level" class="education-item" data-reveal><span class="education-marker"><i></i></span><span class="education-index">0{{ index + 1 }}</span><div class="education-details"><span class="education-level">{{ item.level }}<template v-if="item.date"> · {{ item.date }}</template></span><h3>{{ item.program }}</h3><p>{{ item.institution }}</p></div><strong class="education-result">{{ item.result }}</strong></article></div>
    </div></section>

    <section id="certifications" class="content-section page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">07 / CERTIFICATIONS</span><h2>Learning, recognized.</h2></div><span class="section-aside">COURSE COMPLETIONS<br />AND VIRTUAL INTERNSHIP</span></header>
      <div class="cert-grid"><article v-for="(certification, index) in portfolio.certifications" :key="certification.title" class="cert-card" data-reveal><span class="cert-number">0{{ index + 1 }}</span><span class="cert-mark"><Check :size="17" /></span><h3>{{ certification.title }}</h3><p>{{ certification.provider }}</p><span class="cert-area">{{ certification.area }}</span></article></div>
    </section>

    <section id="achievements" class="content-section section-tint"><div class="page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">08 / ACHIEVEMENTS & STRENGTHS</span><h2>Progress made<br /><span>with people and practice.</span></h2></div><span class="section-aside">COLLABORATION<br />PERSISTENCE · LEARNING</span></header>
      <div class="achievement-layout"><ol class="achievement-list"><li v-for="(achievement, index) in portfolio.achievements" :key="achievement" data-reveal><span>0{{ index + 1 }}</span><p>{{ achievement }}</p></li></ol><aside class="soft-skills" data-reveal><span class="section-kicker">HOW I WORK</span><h3>Soft skills</h3><div><span v-for="skill in portfolio.softSkills" :key="skill">{{ skill }}</span></div></aside></div>
    </div></section>

    <section id="profiles" class="content-section page-shell">
      <header class="section-heading" data-reveal><div><span class="section-kicker">09 / CODING PROFILES</span><h2>Find me<br /><span>around the web.</span></h2></div><span class="section-aside">PERSONAL PROFILES<br />NO UNVERIFIED STATISTICS</span></header>
      <div class="profile-grid"><a v-for="social in portfolio.socials.filter((item) => item.label !== 'Email')" :key="social.label" class="profile-card" :href="social.href" target="_blank" rel="noopener noreferrer" data-reveal><span class="profile-mark">{{ social.mark }}</span><span><strong>{{ social.label }}</strong><small>{{ social.href.replace('https://', '') }}</small></span><ArrowUpRight :size="17" /></a></div>
    </section>

    <section id="contact" class="contact-section"><div class="page-shell"><div class="contact-panel" data-reveal>
      <div class="contact-copy"><span class="section-kicker">10 / CONTACT</span><h2>Let’s Build<br /><span>Something Together</span></h2><p>Get in touch about software development, web projects, or collaboration.</p><a class="contact-email" :href="`mailto:${portfolioConfig.EMAIL}`"><Mail :size="17" />{{ portfolioConfig.EMAIL }}<ArrowUpRight :size="15" /></a>
        <div class="contact-methods"><a :href="`tel:${portfolioConfig.PHONE}`"><Phone :size="15" />{{ portfolioConfig.PHONE }}</a><a :href="portfolioConfig.LINKEDIN_URL" target="_blank" rel="noopener noreferrer"><span class="social-mark">in</span>LinkedIn<ArrowUpRight :size="12" /></a><a :href="portfolioConfig.GITHUB_URL" target="_blank" rel="noopener noreferrer"><Code2 :size="15" />GitHub<ArrowUpRight :size="12" /></a><a :href="portfolioConfig.LEETCODE_URL" target="_blank" rel="noopener noreferrer"><Code2 :size="15" />LeetCode<ArrowUpRight :size="12" /></a></div>
      </div>
      <form class="contact-form" @submit.prevent="submitContact"><div class="form-heading"><span>WRITE A MESSAGE</span><span class="form-required">ALL FIELDS REQUIRED</span></div><label for="contact-name">Name</label><input id="contact-name" name="name" type="text" autocomplete="name" required /><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" autocomplete="email" required /><label for="contact-message">Message</label><textarea id="contact-message" name="message" rows="4" required></textarea><button class="button button-primary send-button" type="submit">SEND MESSAGE <ArrowUpRight :size="15" /></button><p class="form-note">Your email app will open with the message ready to send.</p></form>
    </div></div></section>
  </main>

  <footer class="site-footer"><div class="page-shell footer-inner"><a class="brand" href="#home" aria-label="Srivani Golla, back to top"><span class="brand-mark">S<span>.</span></span><span class="brand-name">SRIVANI GOLLA<small>{{ portfolio.role }} | {{ portfolio.educationTitle }}</small></span></a><nav class="footer-links" aria-label="Footer links"><a v-for="link in portfolio.navLinks.slice(1, 6)" :key="link.href" :href="link.href">{{ link.label }}</a></nav><div class="footer-socials"><a v-for="social in portfolio.socials" :key="social.label" :href="social.href" :aria-label="social.label" :target="social.href.startsWith('http') ? '_blank' : undefined" :rel="social.href.startsWith('http') ? 'noopener noreferrer' : undefined">{{ social.mark }}</a></div><span class="copyright">© {{ year }} SRIVANI GOLLA</span></div></footer>

  <Teleport to="body"><div v-if="selectedProject" class="modal-backdrop" @click.self="closeProject"><section class="project-dialog" role="dialog" aria-modal="true" :aria-labelledby="'dialog-title-' + selectedProject.number" aria-describedby="project-dialog-description">
    <div class="dialog-top"><span>PROJECT DETAILS / {{ selectedProject.number }}</span><button ref="modalCloseButton" class="dialog-close" type="button" aria-label="Close project details" @click="closeProject"><X :size="20" /></button></div>
    <p class="section-kicker">{{ selectedProject.technologies.slice(0, 2).join(' · ') }}</p><h2 :id="'dialog-title-' + selectedProject.number">{{ selectedProject.name }}</h2><p id="project-dialog-description" class="dialog-description">{{ selectedProject.description }}</p><h3>Implementation details</h3>
    <ul class="dialog-list"><li v-for="detail in selectedProject.implementation" :key="detail"><Check :size="15" />{{ detail }}</li></ul><div class="dialog-tags"><span v-for="technology in selectedProject.technologies" :key="technology">{{ technology }}</span></div>
    <div v-if="selectedProject.githubUrl || selectedProject.demoUrl" class="dialog-actions"><a v-if="selectedProject.githubUrl" class="button button-outline" :href="selectedProject.githubUrl" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight :size="14" /></a><a v-if="selectedProject.demoUrl" class="button button-primary" :href="selectedProject.demoUrl" target="_blank" rel="noopener noreferrer">LIVE DEMO <ArrowUpRight :size="14" /></a></div>
  </section></div></Teleport>
</template>