export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

export type Destination = {
  id: number;
  slug: string;
  name: string;
  region: string;
  summary: string;
  description: string;
  best_season: string;
  difficulty: "Fácil" | "Moderada" | "Exigente";
  image_url: string;
  category: Pick<Category, "slug" | "name">;
};
