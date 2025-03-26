
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "photography", name: "Photography" },
  { id: "music", name: "Music" },
  { id: "academics", name: "Academics" },
];

const levels = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

interface CourseFiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedLevel: string | null;
  setSelectedLevel: (level: string | null) => void;
}

const CourseFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
}: CourseFiltersProps) => {
  const [openCategories, setOpenCategories] = useState(true);
  const [openLevels, setOpenLevels] = useState(true);

  return (
    <div className="space-y-6">
      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Categories</h3>
          <CollapsibleTrigger asChild>
            <button className="h-7 w-7 rounded-full border flex items-center justify-center">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle categories</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategory === category.id}
                  onCheckedChange={() => {
                    if (selectedCategory === category.id) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(category.id);
                    }
                  }}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openLevels} onOpenChange={setOpenLevels}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Difficulty Level</h3>
          <CollapsibleTrigger asChild>
            <button className="h-7 w-7 rounded-full border flex items-center justify-center">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle levels</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3">
          <div className="space-y-3">
            {levels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level.id}`}
                  checked={selectedLevel === level.id}
                  onCheckedChange={() => {
                    if (selectedLevel === level.id) {
                      setSelectedLevel(null);
                    } else {
                      setSelectedLevel(level.id);
                    }
                  }}
                />
                <label
                  htmlFor={`level-${level.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {level.name}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="pt-2">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSelectedLevel(null);
          }}
          className="text-sm text-primary underline"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default CourseFilters;
