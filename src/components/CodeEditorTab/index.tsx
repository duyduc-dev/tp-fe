import { useState } from 'react';

type Tab = {
  name: string;
  language: string;
  value: string;
};

type Props = {
  tabs: { [key: string]: Tab };
  currentFile: string;
  onChange: (tab: Tab, tabName: string) => void;
};

const CodeEditorTab = ({ tabs = {}, currentFile = '', onChange }: Props) => {
  const [currentTab, setCurrentTab] = useState(currentFile);
  return (
    <div className="flex items-center">
      {Object.keys(tabs).map((tabItem, index) => (
        <div key={`${tabItem}-${index}`}>
          <button
            className="transition-all px-3 text-[14px] font-[500] dark:bg-wash dark:disabled:bg-arsenic py-2 bg-neutral-50 disabled:bg-neutral-100"
            disabled={tabItem === currentTab}
            onClick={() => {
              setCurrentTab(tabItem);
              onChange?.(tabs[tabItem], tabItem);
            }}
          >
            {tabItem}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CodeEditorTab;
