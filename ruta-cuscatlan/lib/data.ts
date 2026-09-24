import { supabase } from "./supabase";
import type { Category, Destination } from "./types";

const DESTINATION_FIELDS =
  "id, slug, name, region, summary, description, best_season, difficulty, image_url, category:categories!inner(slug, name)";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`No se pudo cargar la categoría: ${error.message}`);
  return data as Category | null;
}

export async function getDestinations(categorySlug?: string): Promise<Destination[]> {
  let query = supabase.from("destinations").select(DESTINATION_FIELDS).order("name");
  if (categorySlug) query = query.eq("category.slug", categorySlug);
  const { data, error } = await query;
  if (error) throw new Error(`No se pudieron cargar los destinos: ${error.message}`);
  return data as unknown as Destination[];
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const { data, error } = await supabase
    .from("destinations")
    .select(DESTINATION_FIELDS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`No se pudo cargar el destino: ${error.message}`);
  return data as unknown as Destination | null;
}
