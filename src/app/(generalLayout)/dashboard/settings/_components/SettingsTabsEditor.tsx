"use client";

import { useEffect, useMemo, useState } from "react";
import ATextEditor from "@/components/form/ATextEditor";
import ASpinner from "@/components/ui/ASpinner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetLegalQuery,
  useUpdateLegalMutation,
} from "@/redux/api/legalApi";
import handleMutation from "@/utils/handleMutation";

type LegalField = "aboutUs" | "termsCondition" | "privacyPolicy";

type LegalContentState = Record<LegalField, string>;

const defaultContent: LegalContentState = {
  aboutUs: "",
  termsCondition: "",
  privacyPolicy: "",
};

const toEditorString = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value == null) return "";

  return String(value);
};

const sections: {
  id: LegalField;
  label: string;
  title: string;
  description: string;
  placeholder: string;
}[] = [
  {
    id: "aboutUs",
    label: "About Us",
    title: "About Us",
    description: "Edit and manage your about us content.",
    placeholder: "Write your about us content...",
  },
  {
    id: "termsCondition",
    label: "Terms & Conditions",
    title: "Terms & Conditions",
    description: "Update the terms and conditions shown to users.",
    placeholder: "Write your terms and conditions...",
  },
  {
    id: "privacyPolicy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    description: "Update the privacy policy content for your platform.",
    placeholder: "Write your privacy policy...",
  },
];

const SettingsTabsEditor = () => {
  const [activeTab, setActiveTab] = useState<LegalField>("aboutUs");
  const [content, setContent] = useState<LegalContentState>(defaultContent);
  const [savedStates, setSavedStates] = useState<Record<LegalField, boolean>>({
    aboutUs: false,
    termsCondition: false,
    privacyPolicy: false,
  });

  const { data, isLoading, isFetching, isError, refetch } = useGetLegalQuery(
    undefined,
  );
  const [updateLegal, { isLoading: isUpdating }] = useUpdateLegalMutation();

  useEffect(() => {
    const legalData = data?.data;

    if (!legalData) return;

    setContent({
      aboutUs: toEditorString(legalData.aboutUs),
      termsCondition: toEditorString(legalData.termsCondition),
      privacyPolicy: toEditorString(legalData.privacyPolicy),
    });
  }, [data]);

  const currentSection = useMemo(
    () => sections.find((section) => section.id === activeTab) ?? sections[0],
    [activeTab],
  );

  const handleEditorChange = (field: LegalField, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: toEditorString(value),
    }));

    setSavedStates((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSave = (field: LegalField) => {
    handleMutation(
      content,
      updateLegal,
      `Saving ${sections.find((section) => section.id === field)?.label || "content"}...`,
      () => {
        setSavedStates((prev) => ({
          ...prev,
          [field]: true,
        }));
      },
    );
  };

  if (isLoading || isFetching) {
    return <ASpinner className="min-h-[420px]" size={70} />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-3xl border border-border bg-background p-6 text-center">
        <p className="text-lg font-semibold">Failed to load settings data.</p>
        <p className="mt-2 text-sm text-secondary-foreground">
          Please try again to fetch the legal content.
        </p>
        <Button className="mt-5" variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as LegalField)}
      className="mt-8"
    >
      <TabsList className="h-auto w-full rounded-3xl border border-border bg-card p-1">
        {sections.map((section) => (
          <TabsTrigger
            key={section.id}
            value={section.id}
            className="min-h-12 flex-1 rounded-2xl py-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section) => (
        <TabsContent
          key={section.id}
          value={section.id}
          className="mt-6 rounded-3xl border border-border bg-card"
        >
          <div className="border-b border-border px-6 py-7">
            <h3 className="text-3xl font-bold">{section.title}</h3>
            <p className="mt-2 text-secondary-foreground">
              {section.description}
            </p>
          </div>

          <div className="space-y-5 p-6">
            <ATextEditor
              content={toEditorString(content[section.id])}
              onChange={(value) => handleEditorChange(section.id, value)}
              placeholder={section.placeholder}
            />

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-secondary-foreground">
                {savedStates[section.id]
                  ? "Saved successfully."
                  : "Changes are saved to the shared legal content."}
              </p>

              <Button
                onClick={() => handleSave(section.id)}
                disabled={isUpdating}
              >
                {isUpdating && currentSection.id === section.id
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SettingsTabsEditor;
