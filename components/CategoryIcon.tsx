import { Bot, Code2, Shield, Rocket, Zap, type LucideProps } from "lucide-react";
import { Category } from "@/lib/types";

const ICON_MAP: Record<Category, React.FC<LucideProps>> = {
  "intelligence-artificielle": Bot,
  "developpement": Code2,
  "cybersecurite": Shield,
  "tech-innovation": Rocket,
  "outils-productivite": Zap,
};

interface Props extends LucideProps {
  category: Category;
}

export default function CategoryIcon({ category, ...props }: Props) {
  const Icon = ICON_MAP[category];
  return <Icon {...props} />;
}
