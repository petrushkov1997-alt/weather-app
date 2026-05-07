import { ReactNode, ChangeEvent, useRef } from 'react';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { cn } from 'shared/utils/cn';
import { Input } from '../Input';
import styles from './styles.module.css';

export interface AutocompleteProps<Item> {
  wrapperClassName?: string;
  placeholder?: string;
  renderItem: (item: Item) => ReactNode;
  children?: ReactNode;
  isOpen: boolean;
  items: Item[];
  value: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: Item) => void;
  onSearch: (query: string) => void;
}

export const Autocomplete = <Item,>({
  wrapperClassName,
  placeholder,
  renderItem,
  children,
  isOpen,
  items,
  value,
  onOpenChange,
  onSelect,
  onSearch,
}: AutocompleteProps<Item>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => onOpenChange(false));

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(value);
    onOpenChange(true);
  };

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper, wrapperClassName)}>
      <Input
        value={value}
        placeholder={placeholder}
        onFocus={() => onOpenChange(true)}
        onChange={handleChange}
      />
      {isOpen && (children || items.length > 0) && (
        <div className={styles.dropdown}>
          {children}
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                onSelect(item);
                onOpenChange(false);
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
