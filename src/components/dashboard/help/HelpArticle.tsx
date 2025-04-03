
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HelpArticleProps {
  article: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
  };
}

export const HelpArticle = ({ article }: HelpArticleProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge>{article.category}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.description}
        </p>
        <Button variant="outline" className="w-full justify-between" size="sm">
          Read Article
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
