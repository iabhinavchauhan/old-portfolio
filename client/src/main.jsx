import React, {useEffect, useMemo, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {FaGithub, FaLinkedin} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);
import {ArrowUpRight,Code2,Database,ExternalLink,Mail,Menu,Moon,Search,Send,Sun,X} from 'lucide-react';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallback = [
  {
    title: 'CineSearch',
    description:
      'Movie discovery app with search, API integration and responsive UI.',
    stack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'API',
      'Tailwind CSS'
    ],
    icon: '🎬',
    liveUrl:
      'https://cinesearchmovies.netlify.app'
  },

  {
    title: 'Google Drive Clone - Cloud Storage Web Application',
    description:
      'A cloud storage web app with file management, uploads, and a clean collaborative dashboard experience.',
    stack: [
      'Ejs',
      'Node.js',
      'Express.js',
      'MongoDB',
      'CSS3',
      'Tailwind CSS'
    ],
    icon: '⛈️'
  },

  {
    title: 'K72 Animated Web Application',
    description:
      'A premium animated web experience combining motion design, interactivity, and modern full-stack architecture.',
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'GSAP',
      'Locomotive Scroll',
      'Tailwind CSS'
    ],
    icon: '🎞️'
  }
];

function App() {
  const containerRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const [dark, setDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    } catch (error) {
      console.warn('Theme localStorage unavailable:', error);
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menu, setMenu] = useState(false);
  const [command, setCommand] = useState(false);
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState(fallback);
  const [status, setStatus] = useState('');
  const [marqueeSpeed, setMarqueeSpeed] = useState('slow');
  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      message: ''
    });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Theme save failed:', error);
    }
  }, [dark]);


  useEffect(() => {
    const marqueeTrack = document.querySelector('.marquee-track');

    if (marqueeTrack) {
      gsap.killTweensOf(marqueeTrack);

      const durationMap = {
        slow: 28,
        normal: 18,
        fast: 12
      };

      gsap.set(marqueeTrack, { xPercent: 0 });
      gsap.to(marqueeTrack, {
        xPercent: -50,
        duration: durationMap[marqueeSpeed] || durationMap.normal,
        ease: 'none',
        repeat: -1,
        repeatDelay: 0,
        immediateRender: true,
        overwrite: true
      });
    }

  }, [marqueeSpeed]);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const initialTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      initialTimeline
        .from('.nav', {
          y: -18,
          opacity: 0,
          duration: 0.7
        })
        .from('.hero .eyebrow', {
          y: 18,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.hero h1 .line', {
          y: 80,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.9,
          stagger: 0.14
        }, '-=0.35')
        .from('.hero .lead', {
          y: 20,
          opacity: 0,
          duration: 0.7
        }, '-=0.5')
        .from('.hero .actions button', {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12
        }, '-=0.35')
        .from('.hero .metrics > div', {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12
        }, '-=0.2')
        .from('.codeCard', {
          x: 40,
          y: 16,
          opacity: 0,
          rotation: 3,
          scale: 0.96,
          duration: 1
        }, '-=0.2');

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 30,
            filter: 'blur(8px)'
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%'
            }
          }
        );
      });

      gsap.utils.toArray('.skill').forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 18,
            rotateX: 25
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            delay: index * 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%'
            }
          }
        );
      });

      gsap.utils.toArray('.project').forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 28,
            rotateX: 8
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%'
            }
          }
        );
      });

      gsap.fromTo(
        '.contact-form .form-field',
        {
          autoAlpha: 0,
          y: 18,
          filter: 'blur(8px)'
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 88%'
          }
        }
      );

      gsap.fromTo(
        '.contact-submit, .status',
        {
          autoAlpha: 0,
          y: 12
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 88%'
          }
        }
      );

      gsap.to('.orb-one', {
        x: 30,
        y: -26,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.orb-two', {
        x: -24,
        y: 22,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floatingTech', {
        y: -18,
        rotate: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.7
      });

      gsap.to('.codeCard', {
        boxShadow: '0 45px 120px rgba(72, 101, 255, 0.18), 0 20px 60px rgba(0,0,0,0.4)',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.hero h1 i', {
        color: '#dfe7ff',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const cursorGlow = cursorGlowRef.current;

      if (cursorGlow) {
        const moveCursor = (event) => {
          gsap.to(cursorGlow, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.6,
            ease: 'power3.out'
          });
        };

        window.addEventListener('pointermove', moveCursor);
        return () => window.removeEventListener('pointermove', moveCursor);
      }

      const card = document.querySelector('.codeCard');

      if (card) {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          gsap.to(card, {
            duration: 0.5,
            rotationY: (x - 0.5) * 8,
            rotationX: (0.5 - y) * 8,
            x: (x - 0.5) * 12,
            y: (y - 0.5) * 10,
            ease: 'power2.out',
            force3D: true
          });
        });

        card.addEventListener('pointerleave', () => {
          gsap.to(card, {
            duration: 0.7,
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            ease: 'power3.out'
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    fetch(
      API + '/projects'
    )
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject()
      )
      .then((data) => {

        if (data.length) {
          setProjects(data);
        }

      })
      .catch(() => {});

  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key
          .toLowerCase() === 'k'
      ) {

        event.preventDefault();
        setCommand(
          (value) => !value
        );

      }

      if (
        event.key === 'Escape'
      ) {
        setCommand(false);
      }

    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };

  }, []);

  const nav = ['home','about','skills','projects','contact'];
  const marqueeItems = ['MERN STACK','REACT','NODE.JS','EXPRESS','MONGODB','FULL STACK','UI/UX','REST APIs','DEPLOYMENT'];

  const filtered = useMemo(() => {
      return nav.filter(
        (item) => item.includes(query.toLowerCase())
      );
  }, [query]);

  const go = (id) => {document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
  });

    setCommand(false);
    setMenu(false);
  };

  async function submit(event) {
    event.preventDefault();
    setStatus(
      'Sending...'
    );

    try {
      const response = await fetch(API + '/contact',{
            method: 'POST',

            headers: {
              'Content-Type':'application/json'
            },

            body:JSON.stringify(form)
          }
        );

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }

      setStatus(
        '✓ Message sent successfully'
      );

      setForm({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      setStatus(
        error.message || 'Server unavailable. Please try again.'
      );
    }
  }

  return (
    <>
      <div className="ambient-bg" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid-overlay" />
      </div>

      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />
      {/* HEADER */}

      <header>
        <nav className="nav wrap">
          <a className="logo" onClick={() => go('home')}>
            AC<span>.</span>
          </a>

          <div className={'navlinks ' + (menu ? 'open': '')}>
            {
              nav.map((item) => (
                  <button key={item} onClick={() => go(item)}>
                    {item}
                  </button>
                )
              )
            }
          </div>

          <div className="navactions">
            <button className="icon search"
              onClick={() =>
                setCommand(true)
              }>

              <Search size={18} />

              <kbd>Ctrl K</kbd>

            </button>

            <button className="icon"
              onClick={() =>
                setDark(!dark)
              }>

              {dark ? <Sun size={18} /> : <Moon size={18} />}

            </button>

            <button className="icon mobile"
              onClick={() =>
                setMenu(!menu)
              } >

              { menu ? <X /> : <Menu />}

            </button>
          </div>
        </nav>
      </header>

      <main ref={containerRef}>
        {/* HERO */}

        <section id="home" className="hero wrap">
          <div className="heroText">
            <p className="eyebrow">
              ● AVAILABLE FOR OPPORTUNITIES
            </p>

            <h1>
              <span className="line">
                Building web products
              </span>

              <span className="line">
                that feel
              </span>

              <span className="line highlight-line">
                <i>
                  fast, clear & useful.
                </i>
              </span>
            </h1>

            <p className="lead">
              Hi, I’m
              {' '}

              <b>
                Abhinav Chauhan
              </b>

              {' '}
              — a Full Stack MERN Developer
              focused on responsive interfaces,
              clean APIs and practical
              user experiences.
            </p>

            <div className="actions">
              <button
                className="primary"
                onClick={() =>
                  go('projects')
                }
              >
                Explore my work

                <ArrowUpRight
                  size={18}
                />

              </button>

              <button
                className="secondary"
                onClick={() =>
                  go('contact')
                }
              >
                Let’s connect

              </button>

            </div>

            <div className="metrics">
              <div>
                <b>
                  15+
                </b>

                <span>
                  Projects
                </span>
              </div>

              <div>
                <b>
                  MERN
                </b>

                <span>
                  Core stack
                </span>
              </div>

              <div>
                <b>
                  100%
                </b>

                <span>
                  Commitment
                </span>
              </div>
            </div>
          </div>

          {/* CODE CARD */}
          <div className="codeCard">

            {/* FLOATING MONGODB */}
            <span className="floatingTech techMongo">
              MongoDB
            </span>

            {/* FLOATING REACT */}
            <span className="floatingTech techReact">
              React.js
            </span>

            <div className="dots">
              <i />
              <i />
              <i />
              <small>
                developer.js
              </small>
            </div>

            <pre>
              <code>
                <em>
                  const
                </em>
                {' '}
                developer = {'{'}
                {'\n'}
                {'  '}
                name:
                {' '}
                <strong>
                  "Abhinav Chauhan"
                </strong>
                ,
                {'\n'}
                {'  '}
                role:
                {' '}
                <strong>
                  "MERN Developer"
                </strong>
                ,
                {'\n'}
                {'  '}
                focus: 
                {' '} 
                <strong>
                   "UX"
                </strong>
                ,
                {' '}
                
                <strong>
                  "APIs"
                </strong>
                ,
                {'\n'}
                {'  '}
                mindset:
                {' '}
                <strong>
                  "Build. Improve. Repeat."
                </strong>
                {'\n'}
                {'}'};
              </code>
            </pre>

            <div className="terminalFoot">
              <span />
              system ready
              <b>
                01
              </b>
            </div>
          </div>
        </section>

        <div className="marquee-shell">
          <div className="marquee-controls" aria-label="Marquee rhythm controls">
            <span>Rhythm</span>
            {['slow', 'normal', 'fast'].map((speed) => (
              <button
                key={speed}
                type="button"
                className={marqueeSpeed === speed ? 'active' : ''}
                onClick={() => setMarqueeSpeed(speed)}
              >
                {speed}
              </button>
            ))}
          </div>

          <div className="marquee-wrap" aria-label="Portfolio skills marquee">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span className="marquee-item" key={item + index}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section
          id="about"
          className="section wrap reveal"
        >
          <Head
            n="01 / ABOUT"
            title="More than code — I care about the experience."
          />

          <div className="grid2">
            <article className="card reveal">
              <Code2 />
              <h3>
                About me
              </h3>

              <p>
                Computer Science graduate
                and developer based in India.
                I enjoy turning ideas into
                polished, maintainable products
                with thoughtful interfaces.
              </p>

              <div className="chips">
                <span>
                  📍 India
                </span>

                <span>
                  💼 Open to work
                </span>

                <span>
                  ✈️ Ready to relocate
                </span>
              </div>
            </article>

            <article className="card reveal">
              <Database />
              <h3>
                How I work
              </h3>

              <ol>
                <li>
                  <b>
                    01
                  </b>

                  <span>
                    <strong>
                      Understand
                    </strong>

                    Start with the problem
                    and user needs.
                  </span>
                </li>

                <li>
                  <b>
                    02
                  </b>

                  <span>
                    <strong>
                      Build
                    </strong>
                    Create clean,
                    responsive solutions.
                  </span>
                </li>

                <li>
                  <b>
                    03
                  </b>

                  <span>
                    <strong>
                      Refine
                    </strong>

                    Improve usability
                    and performance.
                  </span>
                </li>
              </ol>
            </article>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="section wrap reveal"
        >
          <Head
            n="02 / SKILLS"
            title="A practical stack for modern web products."
          />

          <div className="skills">
            {
              [
                'HTML5','CSS3','JavaScript','React.js','Tailwind CSS','Node.js','Express.js',
                'MongoDB','REST APIs','Git & GitHub','Java','SQL'
              ].map(
                (skill, index) => (
                  <div
                    className="skill"
                    key={skill}
                  >

                    <b>
                      {
                        String(index + 1).padStart(2,'0')
                      }
                    </b>

                    {skill}
                  </div>
                )
              )
            }
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="section wrap reveal"
        >

          <Head
            n="03 / PROJECTS"
            title="Selected work, built with purpose."
          />

          <div className="projectGrid">
            {
              projects.map(
                (project, index) => (
                  <article
                    className="project reveal"
                    key={ project._id || project.title}
                  >

                    <div className="projectTop">
                      <span>
                        {
                          String(index + 1).padStart(2,'0')
                        }
                      </span>

                      {
                        project.liveUrl && (

                          <a
                            href={project.liveUrl}
                            target="_blank"
                          >

                            <ExternalLink
                              size={18}
                            />

                          </a>
                        )
                      }
                    </div>

                    <div className="emoji">
                      {
                        project.icon || '💻'
                      }
                    </div>

                    <h3>
                      {
                        project.title
                      }
                    </h3>

                    <p>
                      {
                        project.description
                      }
                    </p>

                    <div className="chips">
                      {
                        (
                          project.stack || []
                        ).map((item) => (
                            <span key={item}>
                              {item}
                            </span>
                          )
                        )
                      }
                    </div>
                  </article>
                )
              )
            }
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="section wrap reveal"
        >

          <div className="contact reveal">
            <div>
              <p className="eyebrow">
                04 / CONTACT
              </p>

              <h2>
                Have an idea?
                Let’s build something useful.
              </h2>

              <p>
                I’m open to full-time roles,
                collaborations and
                meaningful projects.
              </p>

              <div className="socials">
                <a
                  href="mailto:iabhinavchauhan.ac@gmail.com"
                >
                  <Mail />
                  Email
                </a>

                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/iabhinavchauhan"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>

                <a
                  target="_blank"
                  href="https://github.com/iabhinavchauhan"
                >
                  <FaGithub />
                  GitHub
                </a>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="contact-form reveal"
            >
              <label className="form-field">
                <span>Name</span>
                <input
                  required
                  value={
                    form.name
                  }
                  onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value
                      })
                  }
                />

              </label>

              <label className="form-field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={
                    form.email
                  }
                  onChange={(event) =>
                      setForm({...form,
                        email:event.target.value
                      })
                  }
                />
              </label>

              <label className="form-field">
                <span>Message</span>

                <textarea
                  required
                  value={form.message}
                  onChange={(event) => setForm({
                        ...form,
                        message: event.target.value
                    })
                  }
                />
              </label>

              <button
                className="primary contact-submit"
              >
                <Send
                  size={17}
                />
                Send message
              </button>

              <p className="status">
                {status}
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="wrap">
        <span>
          © 2026 Abhinav Chauhan
        </span>

        <span>
          Built with MERN Full Stack.
        </span>
      </footer>

      {/* COMMAND PALETTE */}
      {
        command && (
          <div
            className="modal"
            onMouseDown={() => setCommand(false)}
          >

            <div
              className="palette"
              onMouseDown={(event) => event.stopPropagation()}
            >

              <div className="paletteInput">
                <Search />

                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Jump to a section..."
                />
                <kbd>ESC</kbd>
              </div>

              {
                filtered.map((item) => (
                    <button
                      key={item}
                      onClick={() => go(item)}>
                      <span>⌘</span>

                      <div>
                        <b>
                          {item[0].toUpperCase() + item.slice(1)}
                        </b>

                        <small>Go to {item}</small>
                      </div>
                    </button>
                  )
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
}

const Head = ({ n, title}) => (
  <div className="head">
    <p>{n}</p>
    <h2>{title}</h2>
  </div>
);

createRoot(document.getElementById('root')).render(
  <App />
);