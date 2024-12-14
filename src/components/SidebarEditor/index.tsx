import { Editor } from '@monaco-editor/react';
import Split from '@uiw/react-split';
import { useElementSize } from 'hooks-react-custom';
import { clone } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRunning } from 'react-icons/fa';

import Button from '@/components/Button';
import CodeEditorTab from '@/components/CodeEditorTab';
import useAppHeader from '@/components/Header/useAppHeader.tsx';
import AppTooltip from '@/components/Tooltip';
import useDebounceState from '@/hooks/useDebounceState.ts';
import { LessonDetail } from '@/types/lesson.ts';
import { cn, simplifyString } from '@/utils/helper.ts';

type Props = {
  item: LessonDetail;
};

const SidebarEditor = ({ item }: Props) => {
  const { devMode } = useAppHeader();
  const currentUrlRef = useRef('');
  const { t } = useTranslation();

  const fileData = JSON.parse(item.code);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [currentFileName, setCurrentFileName] = useState<string>(Object.keys(fileData)[0]);
  const [fileList, setFileList] = useDebounceState(fileData);

  const currentFile = useMemo(() => fileList[currentFileName], [currentFileName, fileList]);

  const [ref, size] = useElementSize();

  const BREAKPOINT = 460;

  const handleEditorChange = (value?: string) => {
    if (value === undefined) return;
    const filesData = clone(fileList);
    const data = {
      ...filesData,
      [currentFileName]: {
        ...filesData[currentFileName],
        value,
      },
    };
    setFileList(data);
  };

  const compiler = () => {
    if (!iframeRef.current) return;
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = '';
    }

    const html = /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>body {  margin: 0; overflow: hidden; min-height: 100vh } #root {padding: 16px;} </style>
        <style>${simplifyString(fileList['style.css']?.value ?? '')}</style>
        <link rel="stylesheet" href="">
      </head>
      <body>
        <div id="root" >${fileList['index.html']?.value}</div>

        <script>${(fileList['script.js']?.value ?? '').trim()}</script>
      </body>
    </html>
    `;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;
    currentUrlRef.current = url;
  };

  useEffect(() => {
    if (devMode.isAutoCompiler) {
      compiler();
      return () => {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = '';
      };
    }
  }, [fileList, devMode.isAutoCompiler]);

  return (
    <div
      ref={ref}
      className={cn(' h-full max-h-screen min-w-[200px]', !devMode.isOpenDevMode && '!hidden')}
    >
      <div className="flex  items-center justify-between mb-2 gap-4">
        <CodeEditorTab
          tabs={fileList}
          currentFile={currentFileName}
          onChange={(_, tabName) => {
            setCurrentFileName(tabName);
          }}
        />
        {!devMode.isAutoCompiler && (
          <Button
            data-tooltip-id="tooltip-compiler"
            data-tooltip-content={t`compiler`}
            onClick={() => compiler()}
            variant="secondary"
            className="!h-[32px] !py-0 mr-4 flex items-center gap-2"
          >
            <FaRunning size={20} />
            {size.width >= BREAKPOINT && t`compiler`}
          </Button>
        )}
        <AppTooltip id="tooltip-compiler" hidden={size.width >= BREAKPOINT} />
      </div>
      <Split mode="vertical" className="h-full border-neutral-100 ">
        <div className="min-h-[40%x] h-1/2">
          <Editor
            options={{ contextmenu: false }}
            path={currentFile.name}
            defaultLanguage={currentFile.language}
            language={currentFile.language}
            defaultValue={currentFile.value}
            value={currentFile.value}
            onChange={handleEditorChange}
            height="100%"
          />
        </div>

        <div className="relative bg-white h-1/2 min-h-[50px]">
          <iframe
            ref={iframeRef}
            title="preview"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            width="100%"
            height="100%"
          />
        </div>
      </Split>
    </div>
  );
};

export default SidebarEditor;
