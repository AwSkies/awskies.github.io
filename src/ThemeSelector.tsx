import { ReactNode, useEffect, useState } from "react"
import styles from "./ThemeSelector.module.css";
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import { ReactComponent as MoonFilledIcon } from "./icons/moon-filled.svg";
import { ReactComponent as SunIcon } from "./icons/sun.svg";
import { ReactComponent as SunFilledIcon } from "./icons/sun-filled.svg";
import { ReactComponent as MonitorIcon } from "./icons/device-desktop.svg"
import { ReactComponent as MonitorFilledIcon } from "./icons/device-desktop-filled.svg";
import { ReactComponent as SquareIcon } from "./icons/square.svg";
import { ReactComponent as SquareFilledIcon } from "./icons/square-filled.svg";
import { ReactComponent as SunMoonIcon } from "./icons/sun-moon.svg";

const THEMES = ['default', 'system', 'dark', 'light'] as const;
type Theme = (typeof THEMES)[number];

const THEME_INFO: { [K in Theme]: { on: ReactNode, off: ReactNode, tooltip: string } } = {
  'dark': {
    on: <MoonFilledIcon />,
    off: <MoonIcon />,
    tooltip: "Force dark theme"
  },
  'light': {
    on: <SunFilledIcon />,
    off: <SunIcon />,
    tooltip: "Force light theme"
  },
  'system': {
    on: <MonitorFilledIcon />,
    off: <MonitorIcon />,
    tooltip: "Use this page's default theme"
  },
  'default': {
    on: <SquareFilledIcon />,
    off: <SquareIcon />,
    tooltip: "Use system theme"
  }
};

const THEME_KEY = 'theme';

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem(THEME_KEY) as Theme ?? 'default');

  useEffect(
    () => document.documentElement.style.setProperty(
      'color-scheme',
      (
        () => {
          switch (theme) {
            case "dark":
            case "light":
              return theme;
            case "default":
              return 'dark';
            case "system":
              return 'light dark'
          }
        }
      )()
    ),
    [theme]
  )

  return (
    <div className={styles.themeSelector}>
      <button className={styles.thumbnail}><SunMoonIcon /></button>
      <div className={styles.themeSelections}>
        {
          THEMES.map(
            (t, i) => {
              const themeOn = theme === t;
              return (
                <button
                  className={styles.themeSelection}
                  onClick={() => { setTheme(t); localStorage.setItem(THEME_KEY, t); }}
                  disabled={themeOn} key={i}
                  data-tooltip={THEME_INFO[t].tooltip}
                >
                    {themeOn ? THEME_INFO[t].on : THEME_INFO[t].off}
                </button>
              )
            }
          )
        }
      </div>
    </div>
  )
}
