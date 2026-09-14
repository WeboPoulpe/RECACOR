"use client";

import Link from "next/link";
import { Plus, ExternalLink, Pencil, Pause, Loader2 } from "lucide-react";
import type { AdminArticleListItem } from "@/lib/blog-admin";
import { useEffect, useState } from "react";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  published: { label: "Publié", color: "bg-green-100 text-green-700" },
  scheduled: { label: "Programmé", color: "bg-orange-100 text-orange-700" },
  draft:     { label: "Brouillon", color: "bg-gray-100 text-gray-500" },
};

const CATEGORY_LABEL: Record<string, string> = {
  "pneus-voiture": "Pneus voiture",
  mecanique: "Mécanique",
  "pneus-pl": "Pneus PL",
  blog: "Actualités",
};

function statusBadge(status: string) {
  const s = STATUS_LABEL[status] ?? { label: status, color: "bg-gray-100 text-gray-500" };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.color}`}>
      {s.label}
    </span>
  );
}

function categoryLabel(category: string) {
  return CATEGORY_LABEL[category] ?? category;
}

export default function AdminBlogList() {
  const [articles, setArticles] = useState<AdminArticleListItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [pausing, setPausing] = useState(false);
  const [pauseMessage, setPauseMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((data) => { setArticles(data.articles ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = articles.filter((a) => {
    const matchSearch = search === "" || a.titre.toLowerCase().includes(search.toLowerCase()) || a.slug.includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });
  const scheduledCount = articles.filter((a) => a.status === "scheduled").length;

  const pauseScheduled = async () => {
    if (scheduledCount === 0 || pausing) return;
    if (!window.confirm(`Passer les ${scheduledCount} articles programmés en brouillon et supprimer leurs dates de publication ? Les articles déjà publiés ne seront pas modifiés.`)) return;

    setPausing(true);
    setPauseMessage("");
    try {
      const response = await fetch("/api/admin/articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pause-scheduled" }),
      });
      const data = await response.json() as { ok?: boolean; paused?: number; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Impossible de mettre les articles en brouillon");

      setArticles((current) => current.map((article) => (
        article.status === "scheduled"
          ? { ...article, status: "draft", publish_at: null }
          : article
      )));
      setPauseMessage(`${data.paused ?? scheduledCount} article${(data.paused ?? scheduledCount) > 1 ? "s" : ""} mis en brouillon.`);
    } catch (error) {
      setPauseMessage(error instanceof Error ? error.message : "Impossible de mettre les articles en brouillon");
    } finally {
      setPausing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Articles ({loading ? "…" : articles.length})
          </h1>
          <p className="text-muted-foreground mt-1">Triés par dernière modification.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid"
        >
          <Plus className="h-4 w-4" /> Nouvel article
        </Link>
      </div>

      {/* Filtres */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <input
          type="search"
          placeholder="Rechercher un titre ou slug…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publiés</option>
          <option value="scheduled">Programmés</option>
          <option value="draft">Brouillons</option>
        </select>
        <span className="text-xs text-muted-foreground">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</span>
        {filterStatus === "scheduled" && scheduledCount > 0 && (
          <button
            type="button"
            onClick={pauseScheduled}
            disabled={pausing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-300 bg-orange-50 text-sm font-bold text-orange-800 hover:bg-orange-100 disabled:opacity-60"
          >
            {pausing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pause className="h-4 w-4" />}
            {pausing ? "Mise en brouillon…" : `Mettre les ${scheduledCount} programmés en brouillon`}
          </button>
        )}
      </div>

      {pauseMessage && (
        <p className="mb-5 text-sm font-medium text-foreground" role="status">{pauseMessage}</p>
      )}

      {loading ? (
        <div className="rounded-2xl border border-border bg-white p-12 text-center text-muted-foreground text-sm">
          Chargement…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <p className="text-muted-foreground">Aucun article trouvé.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 text-purple-bright font-semibold hover:underline">
            Créer un article →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-5 py-3 font-bold">Titre</th>
                <th className="px-5 py-3 font-bold hidden sm:table-cell">Catégorie</th>
                <th className="px-5 py-3 font-bold hidden md:table-cell">Statut</th>
                <th className="px-5 py-3 font-bold hidden lg:table-cell">Modifié le</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const updatedAt = a.updated_at
                  ? new Date(a.updated_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                  : "—";
                return (
                  <tr key={a.slug} className="border-t border-border hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold line-clamp-1">{a.titre}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/blog/{a.slug}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs font-medium text-purple-bright bg-purple-bright/[0.06] px-2 py-1 rounded-full">
                        {categoryLabel(a.categorie)}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {statusBadge(a.status)}
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {updatedAt}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/blog/${a.slug}`}
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-bright p-1.5 rounded-lg hover:bg-purple-bright/10"
                          title="Voir sur le site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${a.slug}/edit`}
                          className="inline-flex items-center gap-1.5 text-purple-bright text-xs font-bold px-3 py-1.5 rounded-full bg-purple-bright/10 hover:bg-purple-bright/20"
                        >
                          <Pencil className="h-3 w-3" /> Modifier
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
