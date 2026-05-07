import { ComponentProps } from 'react';
import { cn } from 'shared/utils/cn';
import styles from './styles.module.css';

export interface InputProps extends ComponentProps<'input'> {}

export const Input = ({ className, ...props }: InputProps) => (
  <input {...props} className={cn(styles.searchInput, className)} />
);
