
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { UserRoleType } from "./HelpCenterContent";

interface HelpContactFormProps {
  userRole: UserRoleType;
}

export const HelpContactForm = ({ userRole }: HelpContactFormProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim() || !category) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Support request sent",
        description: "We'll get back to you as soon as possible",
      });
      setSubject("");
      setMessage("");
      setCategory("");
    }, 1000);
  };

  const getCategoriesForRole = () => {
    switch (userRole) {
      case "admin":
        return [
          "Platform Administration",
          "User Management",
          "Content Moderation",
          "Technical Issues",
          "Payment Systems",
          "Other",
        ];
      case "teacher":
        return [
          "Course Creation",
          "Content Upload",
          "Student Management",
          "Payments & Earnings",
          "Live Sessions",
          "Other",
        ];
      case "student":
        return [
          "Course Access",
          "Technical Issues",
          "Billing & Payments",
          "Certificate Issues",
          "Account Management",
          "Other",
        ];
      default:
        return ["General Inquiry", "Technical Support", "Other"];
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Support Category</Label>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {getCategoriesForRole().map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Brief description of your issue"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Please provide as much detail as possible"
          className="min-h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit Ticket"}
        </Button>
      </div>
    </form>
  );
};
