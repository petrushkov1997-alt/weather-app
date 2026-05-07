import { ComponentProps } from 'react';
import { cn } from 'shared/utils/cn';
import styles from './styles.module.css';

export interface PaperProps extends ComponentProps<'div'> {}

export const Paper = ({ className, children, ...props }: PaperProps) => (
  <div className={cn(styles.paper, className)} {...props}>
    {children}
  </div>
);
