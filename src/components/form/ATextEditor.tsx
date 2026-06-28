"use client";

import { useEffect, useMemo, useRef } from "react";

interface JoditTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

type JoditModule = {
  Jodit: {
    make: (
      element: HTMLElement,
      config: Record<string, unknown>,
    ) => {
      value: string;
      events: {
        on: (event: string, cb: (...args: unknown[]) => void) => void;
        off: (event: string, cb: (...args: unknown[]) => void) => void;
      };
      destruct: () => void;
    };
  };
};

const JoditTextEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
}: JoditTextEditorProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<{
    value: string;
    events: {
      on: (event: string, cb: (...args: unknown[]) => void) => void;
      off: (event: string, cb: (...args: unknown[]) => void) => void;
    };
    destruct: () => void;
  } | null>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height: 600,
      theme: "dark",
      style: {
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      },
      toolbarButtonSize: "small",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "table",
        "link",
        "image",
        "|",
        "hr",
        "copyformat",
        "fullsize",
        "print",
        "about",
      ],
      removeButtons: ["source"],
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
      beautyHTML: true,
      toolbarAdaptive: true,
      toolbarSticky: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      controls: {
        font: {
          list: {
            "": "Default",
            "'Helvetica Neue', Helvetica, Arial, sans-serif": "Helvetica",
            "Arial, sans-serif": "Arial",
            "'Times New Roman', Times, serif": "Times New Roman",
            "Georgia, serif": "Georgia",
            "'Courier New', Courier, monospace": "Courier New",
          },
        },
      },
    }),
    [placeholder],
  );

  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      if (!textAreaRef.current) return;

      const mod = (await import("jodit/esm/index.js")) as JoditModule;
      if (!isMounted || !textAreaRef.current) return;

      const editor = mod.Jodit.make(textAreaRef.current, config);
      editorRef.current = editor;
      editor.value = content;

      const handleBlur = (nextValue: unknown) => {
        onChange(typeof nextValue === "string" ? nextValue : editor.value);
      };

      editor.events.on("blur", handleBlur);

      const cleanup = () => {
        editor.events.off("blur", handleBlur);
      };

      (editor as unknown as { __cleanup?: () => void }).__cleanup = cleanup;
    };

    setup();

    return () => {
      isMounted = false;
      const editor = editorRef.current as
        | (typeof editorRef.current & {
            __cleanup?: () => void;
          })
        | null;
      editor?.__cleanup?.();
      editor?.destruct();
      editorRef.current = null;
    };
  }, [config, onChange, content]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.value !== content) {
      editorRef.current.value = content;
    }
  }, [content]);

  return (
    <div className="h-fit">
      <textarea ref={textAreaRef} defaultValue={content} />
    </div>
  );
};

export default JoditTextEditor;
