import { ComponentProps } from 'react';
import recent from 'assets/icons/recent.svg';
import search from 'assets/icons/search.svg';
import close from 'assets/icons/close.svg';
import { cn } from 'shared/utils/cn';
import styles from './styles.module.css';

export enum IconName {
  Recent = 'recent',
  Search = 'search',
  Close = 'close',
}

export interface IconProps extends ComponentProps<'img'> {
  name: IconName;
  size?: number | string;
}

const iconMap: Record<IconName, string> = {
  [IconName.Recent]: recent,
  [IconName.Search]: search,
  [IconName.Close]: close,
};

export const Icon = ({ name, size = 20, className, alt = name, style, ...props }: IconProps) => (
  <img
    {...props}
    src={iconMap[name]}
    alt={alt}
    className={cn(styles.icon, props.onClick && styles.clickable, className)}
    style={{ width: size, height: size, ...style }}
  />
);
