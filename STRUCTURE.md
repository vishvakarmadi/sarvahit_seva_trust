# Sarvahit Seva Trust Web Portal - Project Structure Guide

Welcome to the official developer and project structure documentation for the **Sarvahit Seva Trust Web Portal**.

## Directory Architecture

```
stitch_sarvahit_seva_trust_web_portal/
│
├── index.html                   # Main Production Landing Page (Bootstrap 5, WebGL Shader Canvas, Dark Mode, SEO)
├── about.html                   # About Us, Organization Legacy & Core Values
├── team.html                    # Our Leadership & Department Directors
├── projects.html                # Active Humanitarian Projects & Progress Tracker
├── volunteer.html               # Volunteer Sign-Up & Skill Application Form
├── contact.html                 # Contact Form, Office Address & Phone Support
├── STRUCTURE.md                 # Complete developer guide and directory documentation
│
└── assets/                      # Static Application Assets
    ├── css/
    │   ├── main.css             # Bootstrap 5 Custom Variables & Ethos & Harmony Palette
    │   ├── components.css       # Bootstrap Buttons, Custom Impact Cards & Progress Bars
    │   └── animations.css       # Keyframe Animations, Floating Effects & Reveal Observers
    │
    ├── js/
    │   ├── app.js               # Application Logic (Scroll Observers, Counters, Dark Mode, Bootstrap Modal API)
    │   └── shader.js            # Modular WebGL Ambient Canvas Shader Class
    │
    ├── images/                  # Project Images, Logos & Illustrations
    │
    └── data/
        └── portal-data.json     # Dynamic Content Configuration (Metrics, Causes, Leadership & Team Members)
```

## Key Frameworks & Design Architecture

- **UI Framework**: **Bootstrap 5.3** (CSS Grid, Cards, Modals, Navbar, Form controls & Utilities).
- **Icons**: **Bootstrap Icons** (`bi bi-*`) + **Material Symbols Outlined**.
- **Design Philosophy**: Ethos & Harmony ("Premium Altruism") - combining modern corporate altruism with warm colors.
- **Colors**:
  - Primary Green: `#004429` / `#0B5D3B`
  - Secondary Orange: `#964900` / `#FC820C`
  - Info Royal Blue: `#163484`
- **Typography**: **Be Vietnam Pro** & **Noto Sans Devanagari** (`"सेवा | सहयोग | मानवता | जनकल्याण"`).
- **Effects**: WebGL Interactive Background Shader, Bootstrap Modals, Counter animations, Dark theme mode via `data-bs-theme`.
