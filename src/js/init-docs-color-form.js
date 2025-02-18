import $ from 'dom7';

function colorHexToRgb(hex) {
  const h = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? result.slice(1).map((n) => parseInt(n, 16)) : null;
}

function colorRgbToHsl(r, g, b) {
  r /= 255; // eslint-disable-line
  g /= 255; // eslint-disable-line
  b /= 255; // eslint-disable-line
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h;
  if (d === 0) h = 0;
  else if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;
  const l = (min + max) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (h < 0) h = 360 / 60 + h;
  return [h * 60, s, l];
}
function colorRgbToHex(r, g, b) {
  const result = [r, g, b]
    .map((n) => {
      const hex = n.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
  return `#${result}`;
}
function colorHslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb1;
  if (Number.isNaN(h) || typeof h === 'undefined') {
    rgb1 = [0, 0, 0];
  } else if (hp <= 1) rgb1 = [c, x, 0];
  else if (hp <= 2) rgb1 = [x, c, 0];
  else if (hp <= 3) rgb1 = [0, c, x];
  else if (hp <= 4) rgb1 = [0, x, c];
  else if (hp <= 5) rgb1 = [x, 0, c];
  else if (hp <= 6) rgb1 = [c, 0, x];
  const m = l - c / 2;
  return rgb1.map((n) => Math.max(0, Math.min(255, Math.round(255 * (n + m)))));
}
function colorThemeCSSProperties(hex) {
  const rgb = colorHexToRgb(hex);
  if (!rgb) return {};
  const hsl = colorRgbToHsl(...rgb);
  const hslShade = [hsl[0], hsl[1], Math.max(0, hsl[2] - 0.08)];
  const hslTint = [hsl[0], hsl[1], Math.max(0, hsl[2] + 0.08)];
  const shade = colorRgbToHex(...colorHslToRgb(...hslShade));
  const tint = colorRgbToHex(...colorHslToRgb(...hslTint));
  return {
    '--f7-theme-color': hex,
    '--f7-theme-color-rgb': rgb.join(', '),
    '--f7-theme-color-shade': shade,
    '--f7-theme-color-tint': tint,
  };
}

function getStyles(color = '', bars = 'light') {
  let styles = '';
  const colorThemeProperties = colorThemeCSSProperties(`#${color.replace(/#/g, '')}`);
  let colorThemeRgb = '0, 122, 255';
  if (Object.keys(colorThemeProperties).length) {
    colorThemeRgb = colorThemeProperties['--f7-theme-color-rgb'];
    styles += `
/* Custom color theme */
:root {
  ${Object.keys(colorThemeProperties)
    .map((key) => `${key}: ${colorThemeProperties[key]};`)
    .join('\n  ')}
}`;
  }
  if (bars === 'fill') {
    colorThemeRgb = colorThemeRgb.split(',').map((el) => el.trim());
    styles += `
/* Invert navigation bars to fill style */
:root,
:root.dark,
:root .dark {
  --f7-bars-bg-color: var(--f7-theme-color);
  --f7-bars-bg-color-rgb: var(--f7-theme-color-rgb);
  --f7-bars-translucent-opacity: 0.9;
  --f7-bars-text-color: #fff;
  --f7-bars-link-color: #fff;
  --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
  --f7-bars-border-color: transparent;
  --f7-tabbar-link-active-color: #fff;
  --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
  --f7-sheet-border-color: transparent;
  --f7-tabbar-link-active-border-color: #fff;
}
.appbar,
.navbar,
.toolbar,
.subnavbar,
.calendar-header,
.calendar-footer {
  --f7-touch-ripple-color: var(--f7-touch-ripple-white);
  --f7-link-highlight-color: var(--f7-link-highlight-white);
  --f7-link-touch-ripple-color: var(--f7-touch-ripple-white);
  --f7-button-text-color: #fff;
  --f7-button-pressed-bg-color: rgba(255,255,255,0.1);
}
.navbar-large-transparent,
.navbar-large.navbar-transparent {
  --f7-navbar-large-title-text-color: #000;

  --r: ${colorThemeRgb[0]};
  --g: ${colorThemeRgb[1]};
  --b: ${colorThemeRgb[2]};
  --progress: var(--f7-navbar-large-collapse-progress);
  --f7-bars-link-color: rgb(
    calc(var(--r) + (255 - var(--r)) * var(--progress)),
    calc(var(--g) + (255 - var(--g)) * var(--progress)),
    calc(var(--b) + (255 - var(--b)) * var(--progress))
  );
}
.dark .navbar-large-transparent,
.dark .navbar-large.navbar-transparent {
  --f7-navbar-large-title-text-color: #fff;
}
  `;
  }
  styles = styles.trim();
  return styles;
}

function updateCSSVars($form) {
  const theme = $form.find('input[name="theme"]:checked').val();
  const bars = $form.find('input[name="bars"]:checked').val();
  const color = $form.find('input[name="color"]').val();

  const styles = getStyles(color, bars);
  $('.docs-color-form-code')
    .find('code')
    .html(
      styles ||
        `
  <span class="token comment">/*<br>  Change color or navigation bars style to see genearted styles<br>*/</span>
  `.trim(),
    );

  const $doc = $($form.prev('.docs-demo-device').find('iframe')[0].contentDocument);
  let $styles = $doc.find('style#colors');
  if (!$styles.length) {
    $styles = $(document.createElement('style'));
    $styles.attr('rel', 'stylesheet');
    $styles.attr('id', 'colors');
    $doc.find('head').append($styles);
  }
  $styles[0].textContent = styles;

  $doc.find('html')[theme === 'dark' ? 'addClass' : 'removeClass']('dark');
}

function initDocsColorForm() {
  const $form = $('.docs-color-form');
  if (!$form.length) return;
  $form.on('input', () => {
    updateCSSVars($form);
  });
  $form
    .prev('.docs-demo-device')
    .find('iframe')
    .on('load', () => {
      updateCSSVars($form);
    });
}
export default initDocsColorForm;
