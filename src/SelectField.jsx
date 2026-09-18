import { useEffect, useRef, useState } from 'react';

export default function SelectField({ name, options, defaultValue, ariaLabel }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  useEffect(() => {
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  const choose = (next) => { setValue(next); setOpen(false); };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') setOpen(false);
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen((current) => !current); }
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); }
  };
  return <div className="select-field" ref={root}>
    <input type="hidden" name={name} value={value}/>
    <button type="button" className="select-trigger" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} onKeyDown={onKeyDown}>{value}<span className="select-chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span></button>
    {open && <div className="select-options" role="listbox" aria-label={ariaLabel}>{options.map((option) => <button type="button" role="option" aria-selected={option === value} className={option === value ? 'selected' : ''} key={option} onClick={() => choose(option)}>{option}</button>)}</div>}
  </div>;
}
