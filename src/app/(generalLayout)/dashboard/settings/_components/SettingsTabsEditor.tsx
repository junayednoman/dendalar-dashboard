"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Check, Loader2 } from "lucide-react";
import JoditTextEditor from "@/components/form/ATextEditor";

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

const SettingsTabsEditor = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [savedStates, setSavedStates] = useState<Record<string, boolean>>({});
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: "about",
      title: "About Us",
      content: "This is the About Us section content.",
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      content: "These are the Terms & Conditions.",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: "This is the Privacy Policy content.",
    },
    {
      id: "supports",
      title: "Supports",
      content: "This is the Support content.",
    },
  ]);

  const handleContentChange = (sectionId: string, content: string) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, content } : section,
      ),
    );
    setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
  };

  const handleSave = (sectionId: string) => {
    const section = contentSections.find((s) => s.id === sectionId);
    if (!section) return;

    setSavingStates((prev) => ({ ...prev, [sectionId]: true }));

    // Simulate an API save operation with setTimeout
    setTimeout(() => {
      setSavedStates((prev) => ({ ...prev, [sectionId]: true }));
      setTimeout(() => {
        setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
      }, 2000);
      setSavingStates((prev) => ({ ...prev, [sectionId]: false }));
    }, 1500);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
        >
          {/* Tabs Header */}
          <TabsList className="grid w-full grid-cols-5 bg-card mb-6 h-14">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Terms & Conditions
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger
              value="supports"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Supports
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="flex-1 flex flex-col">
            {contentSections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="flex-1 flex flex-col mt-0"
              >
                <div className="flex-1 flex flex-col">
                  {/* Title */}
                  <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Edit and manage your {section.title.toLowerCase()} content
                    </p>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 p-6">
                    <div className="h-fit bg-background border border-border rounded-lg overflow-hidden">
                      <JoditTextEditor
                        content={section.content}
                        onChange={(content) =>
                          handleContentChange(section.id, content)
                        }
                        placeholder={`Enter your ${section.title.toLowerCase()} content here...`}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="p-6 border-t border-border">
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave(section.id)}
                        disabled={
                          savingStates[section.id] || savedStates[section.id]
                        }
                        className="min-w-[140px] gap-2"
                        size="lg"
                      >
                        {savingStates[section.id] ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : savedStates[section.id] ? (
                          <>
                            <Check className="h-4 w-4" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsTabsEditor;
