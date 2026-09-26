<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { jsPDF } from 'jspdf'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Code2, Command, Mail, Menu, Moon,
  Phone, ShieldCheck, Sun, X,
} from '@lucide/vue'

const isDark = ref(false)
const menuOpen = ref(false)
const year = new Date().getFullYear()
const themeLabel = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme')

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/srivaniyadav174', icon: Code2 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/srivaniyadav174', icon: ArrowUpRight },
  { label: 'LeetCode', href: 'https://leetcode.com/u/srivaniyadav174', icon: Code2 },
  { label: 'Email', href: 'mailto:srivaniyadav174@gmail.com', icon: Mail },
]

const projects = [
  {
    number: '01', name: 'Online voting system', type: 'QUALITY & BACKEND',
    description: 'Designed and validated backend REST APIs integrated with MySQL, testing election workflows for data integrity and correctness.',
    highlight: 'Verified vote submission and real-time result computation with manual edge-case testing.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL', 'REST APIs'],
    visual: 'vote',
  },
  {
    number: '02', name: 'Emotion-based music recommendation', type: 'MACHINE LEARNING',
    description: 'Built and tested a computer-vision pipeline to detect user emotion and map it to personalized music recommendations.',
    highlight: '', tags: ['Python', 'Machine Learning', 'Computer Vision'], visual: 'emotion',
  },
  {
    number: '03', name: 'Dynamic to-do list application', type: 'FRONTEND ENGINEERING',
    description: 'Implemented and manually tested DOM manipulation and local-storage logic for a responsive task-tracking application.',
    highlight: '', tags: ['HTML', 'CSS', 'JavaScript'], visual: 'tasks',
  },
]

const skillGroups = [
  { title: 'Programming', number: '01', skills: ['Java', 'Python', 'JavaScript', 'C', 'C++'] },
  { title: 'Web engineering', number: '02', skills: ['React.js', 'Node.js', 'REST APIs'] },
  { title: 'Quality assurance', number: '03', skills: ['Unit testing', 'Integration testing', 'Functional testing', 'Regression testing', 'Debugging'] },
  { title: 'Data & foundations', number: '04', skills: ['MySQL', 'SQL', 'DBMS', 'Data structures & algorithms', 'OOP'] },
  { title: 'Tools & collaboration', number: '05', skills: ['Git', 'GitHub', 'GitHub Copilot', 'ChatGPT', 'Claude'] },
]

const certifications = [
  { title: 'Java Full Stack Developer Virtual Internship', issuer: 'EduSkills' },
  { title: 'Python Full Course Completion', issuer: 'Udemy' },
  { title: 'Java Full Course Completion Using VS Code', issuer: 'Udemy' },
]

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light')
}

function closeMenu() {
  menuOpen.value = false
}

function downloadResume() {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  const margin = 18
  const width = 174
  let y = 20
  const addText = (text, size = 10, color = [51, 65, 75], weight = 'normal', spacing = 5) => {
    pdf.setFont('helvetica', weight)
    pdf.setFontSize(size)
    pdf.setTextColor(...color)
    const lines = pdf.splitTextToSize(text, width)
    if (y + lines.length * spacing > 278) { pdf.addPage(); y = 20 }
    pdf.text(lines, margin, y)
    y += lines.length * spacing
  }
  const heading = (label) => {
    y += 4
    pdf.setDrawColor(220, 226, 222)
    pdf.line(margin, y, 192, y)
    y += 7
    addText(label.toUpperCase(), 9, [29, 112, 91], 'bold', 5)
    y += 1
  }
  addText('SRIVANI GOLLA', 23, [22, 35, 32], 'bold', 10)
  addText('Aspiring SDET | Software Testing & Automation', 11, [29, 112, 91], 'bold', 6)
  addText('7416889504  |  srivaniyadav174@gmail.com', 9, [85, 96, 93], 'normal', 5)
  addText('linkedin.com/in/srivaniyadav174  |  github.com/srivaniyadav174  |  leetcode.com/u/srivaniyadav174', 8, [85, 96, 93], 'normal', 5)
  heading('Profile')
  addText('Computer Science Engineering student focused on building reliable software, finding defects, improving quality, and creating better user experiences. Hands-on experience debugging and quality-testing web applications using React.js, JavaScript, Node.js, REST APIs, and MySQL.', 9, [51, 65, 75], 'normal', 5)
  heading('Experience')
  addText('Web Development Intern — Apex Planet S/W Pvt. Ltd. | May 2025 – Jun 2025', 10, [22, 35, 32], 'bold', 5)
  addText('Debugged and optimized web pages; resolved visual and functional defects; performed defect triage and root-cause analysis. Built and tested responsive reusable UI components with HTML, CSS, and JavaScript. Verified production web application behavior and collaborated on code review and testing practices in an Agile workflow.', 9, [51, 65, 75], 'normal', 5)
  heading('Projects')
  projects.forEach((project) => {
    addText(project.name, 10, [22, 35, 32], 'bold', 5)
    addText(project.description + (project.highlight ? ` ${project.highlight}` : ''), 9, [51, 65, 75], 'normal', 5)
    addText(project.tags.join(' · '), 8, [29, 112, 91], 'normal', 5)
  })
  heading('Skills')
  skillGroups.forEach((group) => addText(`${group.title}: ${group.skills.join(', ')}`, 9, [51, 65, 75], 'normal', 5))
  heading('Education')
  addText('B.Tech — Computer Science Engineering | Joginpally B.R Engineering College | Expected 2027 | CGPA: 8.91', 9, [51, 65, 75], 'normal', 5)
  addText('Intermediate — MPC | TSWREIS (Girls), Gowlidoddi | 84%', 9, [51, 65, 75], 'normal', 5)
  addText('SSC | TSWREIS (Girls), Gowlidoddi | 100%', 9, [51, 65, 75], 'normal', 5)
  heading('Certifications')
  certifications.forEach((item) => addText(`${item.title} — ${item.issuer}`, 9, [51, 65, 75], 'normal', 5))
  heading('Achievements')
  addText('Collaborated with a team to deliver and test a functional web-based prototype during a college hackathon.', 9, [51, 65, 75], 'normal', 5)
  addText('Strengthened algorithmic problem-solving and coding speed through consistent practice on LeetCode.', 9, [51, 65, 75], 'normal', 5)
  heading('Working strengths')
  addText('Problem solving · Analytical thinking · Team collaboration · Communication · Adaptability · Time management · Quick learning ability', 9, [51, 65, 75], 'normal', 5)
  pdf.save('Srivani-Golla-Resume.pdf')
}

function submitContact(event) {
  const form = new FormData(event.currentTarget)
  const subject = encodeURIComponent(String(form.get('subject') || 'Portfolio enquiry'))
  const body = encodeURIComponent(`Hi Srivani,\n\n${String(form.get('message') || '')}\n\n${String(form.get('name') || '')}\n${String(form.get('email') || '')}`)
  window.location.href = `mailto:srivaniyadav174@gmail.com?subject=${subject}&body=${body}`
}

onMounted(() => {
  isDark.value = localStorage.getItem('portfolio-theme') === 'dark'
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="brand" href="#home" aria-label="Srivani Golla, home"><span class="brand-mark">S<span>.</span></span><span class="brand-label">SRIVANI GOLLA<small>SOFTWARE QUALITY ENGINEERING</small></span></a>
      <div class="nav-links" :class="{ 'nav-open': menuOpen }">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
        <button class="theme-toggle mobile-theme" type="button" :aria-label="themeLabel" @click="toggleTheme"><Sun v-if="isDark" :size="17" /><Moon v-else :size="17" /><span>{{ isDark ? 'Light mode' : 'Dark mode' }}</span></button>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle desktop-theme" type="button" :aria-label="themeLabel" @click="toggleTheme"><Sun v-if="isDark" :size="17" /><Moon v-else :size="17" /></button>
        <a class="nav-contact" href="#contact">Let’s talk <ArrowUpRight :size="15" /></a>
        <button class="menu-toggle" type="button" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><X v-if="menuOpen" :size="22" /><Menu v-else :size="22" /></button>
      </div>
    </nav>
  </header>

  <main id="main">
    <section id="home" class="hero section-wrap">
      <div class="hero-copy">
        <div class="eyebrow"><span class="status-dot"></span> TARGETING SDET INTERNSHIPS <span class="eyebrow-line"></span> 2026</div>
        <h1>Building with care.<br /><span>Testing with intent.</span></h1>
        <p class="hero-name">I’m <strong>Srivani Golla</strong> — aspiring SDET & software quality engineer.</p>
        <p class="hero-description">Computer Science Engineering student focused on building reliable software, finding defects, improving quality, and creating better user experiences.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">View my work <ArrowDownRight :size="17" /></a>
          <button class="button button-outline" type="button" @click="downloadResume">Download resume <ArrowDown :size="16" /></button>
          <a class="button button-quiet" href="#contact">Contact me <ArrowRight :size="16" /></a>
        </div>
        <div class="hero-socials" aria-label="Social profiles">
          <a v-for="social in socialLinks" :key="social.label" :href="social.href" :aria-label="social.label" :title="social.label" :target="social.href.startsWith('http') ? '_blank' : undefined" :rel="social.href.startsWith('http') ? 'noreferrer' : undefined"><component :is="social.icon" :size="17" /><span>{{ social.label }}</span><ArrowUpRight v-if="social.href.startsWith('http')" :size="12" class="social-arrow" /></a>
        </div>
      </div>
      <div class="hero-art" aria-label="Quality engineering process: code, test, debug, validate, ship">
        <div class="art-topline"><span><span class="live-dot"></span> QUALITY ENGINEERING SYSTEM</span><span>SYS.01</span></div>
        <div class="flow-caption"><span>THE RELEASE PIPELINE</span><span class="caption-rule"></span><span>5 STAGES</span></div>
        <div class="flow-list">
          <div class="flow-row"><span class="flow-index">01</span><span class="flow-icon"><Code2 :size="17" /></span><span class="flow-label">CODE</span><span class="flow-note">Build with intent</span><span class="flow-state">INPUT</span></div>
          <div class="flow-connector"><span></span></div>
          <div class="flow-row active"><span class="flow-index">02</span><span class="flow-icon"><Command :size="17" /></span><span class="flow-label">TEST</span><span class="flow-note">Challenge assumptions</span><span class="flow-state">VERIFY</span></div>
          <div class="flow-connector"><span></span></div>
          <div class="flow-row"><span class="flow-index">03</span><span class="flow-icon"><SearchIcon /></span><span class="flow-label">DEBUG</span><span class="flow-note">Trace every signal</span><span class="flow-state">TRACE</span></div>
          <div class="flow-connector"><span></span></div>
          <div class="flow-row"><span class="flow-index">04</span><span class="flow-icon"><Check :size="17" /></span><span class="flow-label">VALIDATE</span><span class="flow-note">Trust, but verify</span><span class="flow-state">PASS</span></div>
          <div class="flow-connector"><span></span></div>
          <div class="flow-row ship-row"><span class="flow-index">05</span><span class="flow-icon"><ArrowUpRight :size="17" /></span><span class="flow-label">SHIP</span><span class="flow-note">Reliable by design</span><span class="flow-state">READY</span></div>
        </div>
        <div class="art-foot"><span><span class="pulse-dot"></span> ALL SYSTEMS INTEGRITY CHECKED</span><span>QUALITY OVER GUESSWORK</span></div>
        <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
      </div>
      <a class="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown :size="14" /></a>
    </section>

    <section id="about" class="about-section section-wrap section-pad">
      <div class="section-heading"><div><span class="section-kicker">01 / A LITTLE ABOUT ME</span><h2>Quality isn’t a phase.<br /><span>It’s the way I think.</span></h2></div><span class="section-aside">CURIOUS BY NATURE.<br />PRECISE BY PRACTICE.</span></div>
      <div class="about-grid">
        <div class="about-lead"><span class="quote-mark">“</span><p>I care about the details that make software dependable: the edge case no one expected, the interaction that feels effortless, the fix that stays fixed.</p></div>
        <div class="about-body"><p>As a Computer Science Engineering student, I bring a testing mindset to web development—from debugging and quality-testing applications to validating REST APIs and data integrity.</p><p>I’m building toward a career in software testing and automation, combining a foundation in programming with a focus on thoughtful, reliable user experiences.</p><a class="text-link" href="#experience">Explore my experience <ArrowRight :size="15" /></a></div>
      </div>
      <div class="about-principles"><div><span>01</span><strong>Think critically</strong><small>Ask what could fail.</small></div><div><span>02</span><strong>Test deliberately</strong><small>Verify the real behavior.</small></div><div><span>03</span><strong>Ship confidently</strong><small>Make reliability the baseline.</small></div></div>
    </section>

    <section id="experience" class="experience-section section-wrap section-pad">
      <div class="section-heading"><div><span class="section-kicker">02 / EXPERIENCE</span><h2>Learning by <span>doing.</span></h2></div><span class="section-aside">HANDS-ON EXPERIENCE<br />01 ROLE</span></div>
      <div class="experience-card"><div class="experience-rail"><span class="rail-dot"></span><span class="rail-line"></span><span class="rail-end">01</span></div><div class="experience-main"><div class="experience-top"><div><span class="experience-type">INTERNSHIP · WEB DEVELOPMENT</span><h3>Web Development Intern</h3><p class="company-name">Apex Planet S/W Pvt. Ltd.</p></div><span class="date-pill">MAY 2025 — JUN 2025</span></div><p class="experience-intro">Worked across the details that make a production web experience feel reliable—debugging, responsive UI, and careful behavior verification.</p><ul class="experience-points"><li>Debugged and optimized existing web pages, identifying and resolving visual and functional defects.</li><li>Performed defect triage and root-cause analysis to help improve application quality.</li><li>Built and tested responsive, reusable UI components using HTML, CSS, and JavaScript.</li><li>Verified behavior across pages of a production web application.</li><li>Collaborated with the development team on code review and testing practices in an Agile workflow.</li></ul><div class="experience-tags"><span>DEBUGGING</span><span>RESPONSIVE UI</span><span>DEFECT TRIAGE</span><span>AGILE</span></div></div></div>
    </section>

    <section id="projects" class="projects-section section-wrap section-pad">
      <div class="section-heading"><div><span class="section-kicker">03 / SELECTED PROJECTS</span><h2>Built to work.<br /><span>Tested to trust.</span></h2></div><span class="section-aside">PROJECTS WITH A<br />QUALITY-FIRST MINDSET</span></div>
      <div class="projects-grid">
        <article v-for="project in projects" :key="project.number" class="project-card" :class="`project-${project.visual}`">
          <div class="project-visual"><div class="visual-top"><span>PROJECT / {{ project.number }}</span><span class="visual-cross">✳</span></div>
            <div v-if="project.visual === 'vote'" class="vote-visual"><div class="vote-window"><div class="window-bar"><i></i><i></i><i></i><span>election_api / integrity_check</span></div><div class="terminal-line"><span class="terminal-green">&gt;</span> validate_vote(payload)</div><div class="terminal-line terminal-dim">checking ballot integrity<span class="terminal-dots">...</span></div><div class="terminal-result"><Check :size="13" /> vote accepted <span>200 OK</span></div><div class="vote-progress"><i></i></div><div class="terminal-foot"><span>RECORD VERIFIED</span><span>EDGE CHECK</span></div></div><div class="visual-index">DATA INTEGRITY / 001</div></div>
            <div v-else-if="project.visual === 'emotion'" class="emotion-visual"><div class="emotion-orbit"><span class="orbit-core"><span>:) </span></span><i class="emotion-node node-a">calm</i><i class="emotion-node node-b">focus</i><i class="emotion-node node-c">joy</i></div><div class="music-bars"><i v-for="n in 25" :key="n" :style="{ '--bar': `${12 + ((n * 17) % 42)}px`, '--delay': `${n * -0.08}s` }"></i></div><div class="visual-index">SIGNAL → FEELING → SOUND</div></div>
            <div v-else class="tasks-visual"><div class="task-window"><div class="task-window-title"><span>today.list</span><span>03 / 05</span></div><div class="task-item"><i class="task-check done"><Check :size="11" /></i><span>Map user flow</span><b>DONE</b></div><div class="task-item"><i class="task-check done"><Check :size="11" /></i><span>Check edge cases</span><b>DONE</b></div><div class="task-item current"><i class="task-check"></i><span>Test persistence</span><b>NOW</b></div><div class="task-item"><i class="task-check"></i><span>Ship with confidence</span><b>NEXT</b></div></div><div class="visual-index">SMALL TASKS. CLEAR PROGRESS.</div></div>
          </div>
          <div class="project-content"><div class="project-meta"><span>{{ project.type }}</span><span>{{ project.number }} / 03</span></div><h3>{{ project.name }}</h3><p>{{ project.description }}</p><p v-if="project.highlight" class="project-highlight"><ShieldCheck :size="15" />{{ project.highlight }}</p><div class="project-tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div><span class="project-no-link">PROJECT DETAILS <span>External links not provided</span></span></div>
        </article>
      </div>
      <p class="projects-note"><ShieldCheck :size="15" /> Project repository and demo links are not available; no external project URLs have been added.</p>
    </section>

    <section id="skills" class="skills-section section-wrap section-pad">
      <div class="section-heading"><div><span class="section-kicker">04 / TOOLKIT</span><h2>My engineering <span>toolkit.</span></h2></div><span class="section-aside">FOUNDATIONS FIRST.<br />ALWAYS LEARNING.</span></div>
      <div class="skills-layout"><div class="skills-note"><span class="skills-note-icon"><ShieldCheck :size="20" /></span><h3>Built on fundamentals.</h3><p>A practical foundation across programming, web development, data, and software testing—with quality woven through every layer.</p><div class="skills-note-bottom"><span>VERIFIED TOOLSET</span><span class="pulse-dot"></span></div></div><div class="skill-groups"><div v-for="group in skillGroups" :key="group.number" class="skill-group"><span class="skill-number">{{ group.number }}</span><div><h3>{{ group.title }}</h3><div class="skill-chips"><span v-for="skill in group.skills" :key="skill">{{ skill }}</span></div></div><ArrowUpRight :size="16" class="skill-arrow" /></div></div></div>
    </section>

    <section id="education" class="education-section section-wrap section-pad">
      <div class="section-heading"><div><span class="section-kicker">05 / EDUCATION & MORE</span><h2>Grounded in learning.<br /><span>Driven by curiosity.</span></h2></div><span class="section-aside">A STRONG FOUNDATION<br />A GROWTH MINDSET</span></div>
      <div class="education-grid"><div class="education-column"><h3 class="subsection-title"><span class="subsection-icon"><Code2 :size="16" /></span> EDUCATION</h3><div class="education-list"><article class="education-card featured-education"><span class="education-year">EXPECTED 2027</span><span class="education-level">BACHELOR’S DEGREE</span><h4>B.Tech — Computer Science Engineering</h4><p>Joginpally B.R Engineering College</p><span class="education-score">CGPA <strong>8.91</strong></span></article><article class="education-card"><span class="education-level">INTERMEDIATE · MPC</span><h4>Intermediate — MPC</h4><p>TSWREIS (Girls), Gowlidoddi</p><span class="education-score">SCORE <strong>84%</strong></span></article><article class="education-card"><span class="education-level">SECONDARY SCHOOL</span><h4>SSC</h4><p>TSWREIS (Girls), Gowlidoddi</p><span class="education-score">SCORE <strong>100%</strong></span></article></div></div>
        <div class="cert-column"><h3 class="subsection-title"><span class="subsection-icon"><Check :size="16" /></span> CERTIFICATIONS</h3><div class="cert-list"><article v-for="(cert, index) in certifications" :key="cert.title" class="cert-card"><span class="cert-number">0{{ index + 1 }}</span><div><h4>{{ cert.title }}</h4><p>{{ cert.issuer }}</p></div><span class="cert-seal"><Check :size="15" /></span></article></div><div class="achievements-card"><h3><span class="subsection-icon"><ArrowUpRight :size="16" /></span> HIGHLIGHTS</h3><ul><li>Collaborated with a team to deliver and test a functional web-based prototype during a college hackathon.</li><li>Strengthened algorithmic problem-solving and coding speed through consistent practice on LeetCode.</li></ul></div></div></div>
      <div class="soft-skills"><span class="soft-label">HOW I WORK</span><div class="soft-chips"><span>Problem solving</span><span>Analytical thinking</span><span>Team collaboration</span><span>Communication</span><span>Adaptability</span><span>Time management</span><span>Quick learning</span></div></div>
    </section>

    <section id="contact" class="contact-section section-wrap section-pad"><div class="contact-panel"><div class="contact-copy"><span class="section-kicker">06 / LET’S CONNECT</span><h2>Let’s make software<br /><span>better, together.</span></h2><p>Looking for an SDET intern who cares about the details? I’d love to hear about your team and the problems you’re solving.</p><a class="contact-email" href="mailto:srivaniyadav174@gmail.com"><Mail :size="17" /> srivaniyadav174@gmail.com <ArrowUpRight :size="15" /></a><div class="contact-details"><a href="tel:+917416889504"><Phone :size="14" /> +91 74168 89504</a><a href="https://linkedin.com/in/srivaniyadav174" target="_blank" rel="noreferrer"><ArrowUpRight :size="14" /> LinkedIn <ArrowUpRight :size="12" /></a></div></div><form class="contact-form" @submit.prevent="submitContact"><div class="form-heading"><span>START A CONVERSATION</span><span class="form-status"><i></i> OPEN TO OPPORTUNITIES</span></div><label for="contact-name">Your name</label><input id="contact-name" name="name" type="text" placeholder="Jane Smith" autocomplete="name" required /><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="jane@company.com" autocomplete="email" required /><label for="contact-subject">Subject</label><input id="contact-subject" name="subject" type="text" placeholder="SDET internship opportunity" required /><label for="contact-message">Your message</label><textarea id="contact-message" name="message" rows="3" placeholder="Tell me a little about what you have in mind..." required></textarea><button class="button button-primary send-button" type="submit">Send a message <ArrowUpRight :size="16" /></button><p class="form-note">Opens your email app with your message ready to send.</p></form></div></section>
  </main>

  <footer class="site-footer section-wrap"><a class="brand footer-brand" href="#home"><span class="brand-mark">S<span>.</span></span><span class="brand-label">SRIVANI GOLLA<small>SOFTWARE QUALITY ENGINEERING</small></span></a><span class="footer-note">Thoughtful code. Thorough testing. Better software.</span><div class="footer-right"><span>© {{ year }} SRIVANI GOLLA</span><a href="#home" aria-label="Back to top">BACK TO TOP <ArrowUpRight :size="13" /></a></div></footer>
</template>

<script>
const SearchIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
}
export default { components: { SearchIcon } }
</script>
