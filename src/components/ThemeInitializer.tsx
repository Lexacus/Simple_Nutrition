import { useEffect } from 'react';
import { useSettingsStore } from '@/store/SettingsStore';

export const ThemeInitializer = () => {
  const { theme } = useSettingsStore(({ theme }) => ({ theme }));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}; 