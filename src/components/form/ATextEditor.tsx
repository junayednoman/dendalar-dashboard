"use client";

import { useEffect, useMemo, useRef } from "react";

interface ATextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const JODIT_STYLESHEET_ID = "jodit-editor-stylesheet";

const ensureString = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value == null) return "";

  return String(value);
};

const ATextEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
}: ATextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;
  const normalizedContent = ensureString(content);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height: 600,
      theme: "dark",
      toolbarButtonSize: "small" as const,
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
      ],
      removeButtons: ["source", "about", "print"],
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
      beautyHTML: true,
      toolbarAdaptive: true,
      toolbarSticky: false,
      style: {
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      },
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [placeholder],
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const existingStylesheet = document.getElementById(JODIT_STYLESHEET_ID);

    if (existingStylesheet) return;

    const link = document.createElement("link");
    link.id = JODIT_STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href = "/vendor/jodit.css";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      const [{ Jodit }] = await Promise.all([
        import("jodit/esm/index.js"),
        import("jodit/esm/plugins/all.js"),
      ]);

      if (!isMounted || !textareaRef.current) return;

      const editor = Jodit.make(textareaRef.current, config as any);
      editorRef.current = editor;
      editor.value = normalizedContent;

      editor.events.on("change", (updatedContent: string) => {
        onChangeRef.current(ensureString(updatedContent));
      });

      editor.events.on("blur", () => {
        onChangeRef.current(ensureString(editor.value));
      });
    };

    initializeEditor();

    return () => {
      isMounted = false;

      if (!editorRef.current) return;

      if (editorRef.current.isReady) {
        editorRef.current.destruct();
      } else {
        editorRef.current
          .waitForReady()
          .then((instance: any) => instance.destruct());
      }

      editorRef.current = null;
    };
  }, [config, normalizedContent]);

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) return;

    if (editor.value !== normalizedContent) {
      editor.value = normalizedContent;
    }
  }, [normalizedContent]);

  return (
    <div className="jodit-shell h-fit overflow-hidden rounded-3xl border border-border bg-background">
      <textarea ref={textareaRef} defaultValue={normalizedContent} />
    </div>
  );
};

export default ATextEditor;
