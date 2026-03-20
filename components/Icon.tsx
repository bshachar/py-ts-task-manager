
import React from 'react';

type IconProps = {
  svg: string;
  className?: string;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ svg, className = 'w-5 h-5', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${size} ${size}`}
    fill="currentColor"
    className={className}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

export const PlusIcon = `<path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />`;
export const ViewColumnsIcon = `<path fillRule="evenodd" d="M4.875 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75zM8.625 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75zM12.375 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75zM16.125 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75zM20.625 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75z" clipRule="evenodd" />`;
export const Bars3Icon = `<path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />`;
export const PencilIcon = `<path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />`;
export const TrashIcon = `<path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 01-1.255 8.712A3.75 3.75 0 0111.5 16.5h-5A3.75 3.75 0 012.755 13.42a48.816 48.816 0 01-1.255-8.712V4.478c0-1.008.789-1.82.18-1.82h12.14c.991 0 1.8.812 1.8 1.82zM5.25 5.25V6.75a.75.75 0 001.5 0V5.25a.75.75 0 00-1.5 0zM8.25 5.25V6.75a.75.75 0 001.5 0V5.25a.75.75 0 00-1.5 0zM11.25 5.25V6.75a.75.75 0 001.5 0V5.25a.75.75 0 00-1.5 0z" clipRule="evenodd" />`;
export const Bars3BottomLeftIcon = `<path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />`;
export const SignalIcon = `<path fill-rule="evenodd" d="M3.75 12a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6Zm4.5 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6Zm4.5 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6Zm4.5 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6Z" clip-rule="evenodd" />`;
export const ExclamationCircleIcon = `<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.72a.75.75 0 0 1 1.06 0l.97.97a.75.75 0 0 1 0 1.06l-.97.97a.75.75 0 1 1-1.06-1.06l.97-.97-.97-.97a.75.75 0 0 1 0-1.06Zm1.06-3.19a.75.75 0 1 0-1.06 1.06l.97.97a.75.75 0 0 0 1.06 0l.97-.97a.75.75 0 0 0-1.06-1.06l-.97.97-.97-.97Z" clip-rule="evenodd" />`;
export const ShieldCheckIcon = `<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm1.42 10.28a.75.75 0 0 0-1.06-1.06l-4.25 4.25a.75.75 0 0 0 1.06 1.06L13.48 12.53Z" clip-rule="evenodd" />`;
export const MinusIcon = `<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM7.5 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 12Z" clip-rule="evenodd" />`;
export const ChevronUpIcon = `<path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />`;
export const ChevronDownIcon = `<path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />`;
export const CalendarIcon = `<path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />`;
export const MagnifyingGlassIcon = `<path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />`;
